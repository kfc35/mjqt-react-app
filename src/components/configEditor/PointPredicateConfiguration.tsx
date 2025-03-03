import { MAX_POINTS, pointPredicateIdToLogicOptionsMap, RootPointPredicateConfiguration, type PointPredicateBaseConfiguration } from "mjqt-scoring";
import { pointPredicateIdToContentMap, PointPredicateContent } from "./pointPredicateIdToContentMap"
import { useState, ReactElement } from "react";
import { getRouteApi, useRouter } from '@tanstack/react-router'

interface PointPredicateConfigurationProps {
    pointPredicateId: string
    maxPoints: number
}

function PointPredicateConfiguration(props: PointPredicateConfigurationProps) {
    const route = getRouteApi('/config');
    const router = useRouter();
    const rootConfig: RootPointPredicateConfiguration = route.useLoaderData().rootPointPredicateConfig;
    const baseConfig: PointPredicateBaseConfiguration | undefined = rootConfig.getBaseConfiguration(props.pointPredicateId);
    if (!baseConfig) {
        return (<></>);
    }
    const definedBaseConfig: PointPredicateBaseConfiguration = baseConfig;
    //const logicConfigOptions: string[] = [...pointPredicateIdToLogicOptionsMap.get(props.pointPredicateId) ?? []];

    const [enabled, setEnabled] = useState(baseConfig.enabled);
    const [isBonus, setIsBonus] = useState(baseConfig.isBonus);
    const [points, setPoints] = useState(baseConfig.points);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    //const [logicConfigOptionValues, setLogicConfigOptionValues] = useState([]);

    function onEnabledChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnabled(event.currentTarget.checked);
        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    function onIsBonusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsBonus(event.currentTarget.checked);
        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    // TODO fix this
    function onPointsChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.value.trim() === MAX_POINTS) {
            setPoints(MAX_POINTS);
        } else if (!event.currentTarget.value.trim() || isNaN(event.currentTarget.valueAsNumber)) {
            setPoints(0);
        } else if (event.currentTarget.valueAsNumber >= props.maxPoints) {
            setPoints(MAX_POINTS);
        } 
        setPoints(event.currentTarget.valueAsNumber);
        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    function submit(event: React.FormEvent) {
        event.preventDefault();
        definedBaseConfig.enabled = enabled;
        definedBaseConfig.isBonus = isBonus;
        definedBaseConfig.points = points;
        router.invalidate();
        setSubmitDisabled(true);
    }

    const pointPredicateContent = pointPredicateIdToContentMap.get(props.pointPredicateId);
    if (!pointPredicateContent) {
        return (<></>);
    }
    const enabledId = props.pointPredicateId + "_enabled";
    const isBonusId = props.pointPredicateId + "_isBonus";
    const pointsId = props.pointPredicateId + "_points";
    const includedPointPredicateSection = includedPointPredicatesToElement(baseConfig.includedPointPredicates);
    return(
        <>
            <div className="predicate-config">
                <h3>{pointPredicateContent.title}</h3>
                {pointPredicateContent.description}
                {includedPointPredicateSection}
                <form className="config-form" onSubmit={submit}>
                <div>
                    <label htmlFor={enabledId}>Enabled: </label><input type="checkbox" id={enabledId} checked={enabled} onChange={onEnabledChange} />
                </div>
                <div>
                    <label htmlFor={isBonusId}>Is Bonus: </label><input type="checkbox" id={isBonusId} checked={isBonus} onChange={onIsBonusChange} />
                </div>
                <div>
                    <label htmlFor={pointsId}>Points: </label><input type="text" id={pointsId} value={points} onChange={onPointsChange} disabled />
                </div>
                <br />
                <div>
                    <input type="submit" value="Save Changes" disabled={submitDisabled}/>
                </div>
                </form>
                
            </div>
        </>
    );
}

export default PointPredicateConfiguration

function includedPointPredicatesToElement(pointPredicateIds: ReadonlySet<string>): ReactElement {
    const includedPointPredicates = [...pointPredicateIds]
        .map(pointPredicateId => [pointPredicateId, pointPredicateIdToContentMap.get(pointPredicateId)] as [string, PointPredicateContent])
        .filter(([_, content]) => !!content)
        .map(([pointPredicateId, content]) => <li key={pointPredicateId}>{content.title}</li>);
    return includedPointPredicates.length > 0 ? 
    (<div className="included-point-predicates">Includes points from:<ul>{includedPointPredicates}</ul></div>) : <></>;
}