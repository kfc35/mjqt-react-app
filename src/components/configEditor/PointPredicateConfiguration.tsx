import { convertToPointType, pointPredicateIdToLogicOptionsMap, 
    RootPointPredicateConfiguration, PointPredicateBaseConfiguration, MAX_POINTS, 
    PointPredicateLogicConfiguration} from "mjqt-scoring";
import { PointPredicateContent } from "../../content/pointPredicateContent";
import { pointPredicateIdToContentMap } from "../../content/pointPredicateIdToContentMap"
import { pointPredicateLogicOptionToContentMap } from "./optionToContentMap";
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
    const logicConfig: PointPredicateLogicConfiguration = rootConfig.pointPredicateLogicConfiguration;
    const base: PointPredicateBaseConfiguration | undefined = rootConfig.getBaseConfiguration(props.pointPredicateId);
    if (!base) {
        return (<></>);
    }
    const baseConfig: PointPredicateBaseConfiguration = base;

    const initIncludedPointPredicates = baseConfig.generateIncludedPointPredicates(rootConfig.pointPredicateLogicConfiguration);
    const logicConfigOptions: string[] = [...pointPredicateIdToLogicOptionsMap.get(props.pointPredicateId) ?? []];
    const initLogicConfigOptionToVals: Map<string, boolean | undefined> = new Map();
    logicConfigOptions.forEach(option => initLogicConfigOptionToVals.set(option, logicConfig.getOptionValue(option)));

    const [enabled, setEnabled] = useState(baseConfig.enabled);
    const [isBonus, setIsBonus] = useState(baseConfig.isBonus);
    const [points, setPoints] = useState(baseConfig.points + "");
    const [includedPointPredicates, setIncludedPointPredicates] = useState(initIncludedPointPredicates);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [logicConfigOptionToValues, setLogicConfigOptionToValues] = useState(initLogicConfigOptionToVals);

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

    function onPointsChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPoints(event.currentTarget.value);
        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    function onLogicOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        const mapCopy: Map<string, boolean | undefined> = new Map();
        logicConfigOptionToValues.forEach((val, key) => mapCopy.set(key, val));
        mapCopy.set(event.currentTarget.name, event.currentTarget.checked);
        setLogicConfigOptionToValues(mapCopy);

        const logicConfigCopy = new PointPredicateLogicConfiguration(mapCopy);
        setIncludedPointPredicates(baseConfig.generateIncludedPointPredicates(logicConfigCopy));

        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    const ppc = pointPredicateIdToContentMap.get(props.pointPredicateId);
    if (!ppc) {
        return (<></>);
    }
    const pointPredicateContent: PointPredicateContent = ppc;

    function submit(event: React.FormEvent) {
        event.preventDefault();

        const pts = convertToPointType(points);
        if (!pts || (pts !== MAX_POINTS && pts < 0)) {
            alert(pointPredicateContent.title + " does not have a valid Points value. " +
                "It must be 0, a positive number, or 'MAX'.");
            return;
        } else if (pts !== MAX_POINTS && pts > rootConfig.maxPoints) {
            baseConfig.points = MAX_POINTS;
        } else {
            baseConfig.points = pts;
        }
        
        baseConfig.enabled = enabled;
        baseConfig.isBonus = isBonus;
        logicConfigOptionToValues.forEach((val, key) => rootConfig.pointPredicateLogicConfiguration.setOptionValue(key, val ?? false));
        router.invalidate();
        setSubmitDisabled(true);
    }

    function discard(event: React.FormEvent) {
        event.preventDefault();
        setEnabled(baseConfig.enabled);
        setIsBonus(baseConfig.isBonus);
        setPoints(baseConfig.points + "");
        setLogicConfigOptionToValues(initLogicConfigOptionToVals);
        setIncludedPointPredicates(initIncludedPointPredicates);
        setSubmitDisabled(true);
    }

    const enabledId = props.pointPredicateId + "_enabled";
    const isBonusId = props.pointPredicateId + "_isBonus";
    const pointsId = props.pointPredicateId + "_points";
    const includedPointPredicateSection = includedPointPredicatesToElement(includedPointPredicates);
    return(
        <>
            <div className="predicate-config">
                <h3>{pointPredicateContent.title}</h3>
                {pointPredicateContent.description}
                {includedPointPredicateSection}
                <form onSubmit={submit}>
                <div className="config-row">
                <div>
                    <label htmlFor={enabledId}>Enabled: </label>
                    <input type="checkbox" id={enabledId} checked={enabled} onChange={onEnabledChange} />
                </div>
                <div>
                    <label htmlFor={pointsId}>Points: </label>
                    <input type="text" id={pointsId} size={4} value={points} onChange={onPointsChange} />
                </div>
                <div>
                    <label htmlFor={isBonusId}>Is Bonus: </label>
                    <input type="checkbox" id={isBonusId} checked={isBonus} onChange={onIsBonusChange} />
                </div>
                </div>
                {logicOptionsToElement(logicConfigOptions, logicConfigOptionToValues, onLogicOptionChange)}
                <div className="config-row">
                <div>
                    <input type="submit" value="Save Changes" disabled={submitDisabled}/> 
                </div>
                <div>
                    <input type="button" value="Discard Changes" onClick={discard} disabled={submitDisabled}/> 
                </div> 
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


function logicOptionsToElement(logicConfigOptions: string[],
    logicConfigOptionToVals: Map<string, boolean | undefined>,
    onLogicOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void): ReactElement {
    const optionElements: ReactElement[] = [];
    for (const option of logicConfigOptions) {
        const content = pointPredicateLogicOptionToContentMap.get(option);
        if (!content) {
            continue;
        }
        optionElements.push(<div key={option}>
            <label htmlFor={option}>{content.optionTitle}: </label>
            <input type="checkbox" name={option} checked={logicConfigOptionToVals.get(option)} onChange={onLogicOptionChange} />
            </div>);
    }
    if (optionElements.length === 0) {
        return <></>;
    }
    return <div className="config-row">
        {optionElements}
    </div>;
}