import { MAX_POINTS, PointPredicateBaseConfiguration } from "mjqt-scoring";
import { pointPredicateIdToContentMap, PointPredicateContent } from "./pointPredicateIdToContentMap"
import { useState } from "react";

interface PointPredicateConfigurationProps {
    pointPredicateId: string
    baseConfig: PointPredicateBaseConfiguration
    maxPoints: number
}

function PointPredicateConfiguration(props: PointPredicateConfigurationProps) {
    const [enabled, setEnabled] = useState(props.baseConfig.enabled);
    const [isBonus, setIsBonus] = useState(props.baseConfig.isBonus);
    const [points, setPoints] = useState(props.baseConfig.points);

    function onEnabledChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnabled(event.currentTarget.checked);
    }

    function onIsBonusChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsBonus(event.currentTarget.checked);
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
    }

    const pointPredicateContent = pointPredicateIdToContentMap.get(props.pointPredicateId);
    if (!pointPredicateContent) {
        return (<></>);
    }
    const includedPointPredicates = [...props.baseConfig.includedPointPredicates]
        .map(pointPredicateId => [pointPredicateId, pointPredicateIdToContentMap.get(pointPredicateId)] as [string, PointPredicateContent])
        .filter(([_, content]) => !!content)
        .map(([pointPredicateId, content]) => <li key={pointPredicateId}>{content.title}</li>);
    const includedPointPredicateSection = includedPointPredicates.length > 0 ? 
    (<div>Includes points from:<ul>{includedPointPredicates}</ul></div>) : <></>;

    const enabledId = props.pointPredicateId + "_enabled";
    const isBonusId = props.pointPredicateId + "_isBonus";
    const pointsId = props.pointPredicateId + "_points";
    return(
        <>
            <div>
                <h3>{pointPredicateContent.title}</h3>
                <p>{pointPredicateContent.description}</p>
            </div>
            <div>
                <label htmlFor={enabledId}>Enabled: </label><input type="checkbox" id={enabledId} checked={enabled} onChange={onEnabledChange} disabled/>
            </div>
            <div>
                <label htmlFor={isBonusId}>Is Bonus: </label><input type="checkbox" id={isBonusId} checked={isBonus} onChange={onIsBonusChange} disabled/>
            </div>
            <div>
                <label htmlFor={pointsId}>Points: </label><input type="text" id={pointsId} value={points} onChange={onPointsChange} disabled />
            </div>
            {includedPointPredicateSection}
            <br />
        </>
    );
}

export default PointPredicateConfiguration