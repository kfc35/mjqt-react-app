import { getRouteApi } from '@tanstack/react-router'
import { RootPointPredicateConfiguration, PointPredicateBaseConfiguration, MAX_POINTS, convertToPointType, PointPredicateLogicConfiguration } from 'mjqt-scoring';
import { useRouter } from '@tanstack/react-router';
import { useState, ReactElement } from 'react';
import PointPredicateConfiguration from './PointPredicateConfiguration';
import './ConfigurationEditor.css'

function ConfigurationEditor() {
    const route = getRouteApi('/config');
    const rootConfig: RootPointPredicateConfiguration = route.useLoaderData().rootPointPredicateConfig;
    const [maxPoints, setMaxPoints] = useState(rootConfig.maxPoints);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const router = useRouter();

    function submit(event: React.FormEvent) {
        event.preventDefault();
        rootConfig.maxPoints = maxPoints;
        void router.invalidate();
        setSubmitDisabled(true);

        console.log("Saved");
    }

    function onMaxPointsChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (isNaN(event.currentTarget.valueAsNumber)) {
            setMaxPoints(0);
        } else {
            setMaxPoints(event.currentTarget.valueAsNumber);
        }
        if (submitDisabled) {
            setSubmitDisabled(false);
        }
    }

    function createOnPointPredicateConfigSubmit(baseConfig: PointPredicateBaseConfiguration) {
        return (points: string, enabled: boolean, isBonus: boolean, logicConfigOptionToValues: Map<string, boolean | undefined>, predicateTitle: string) => {
            const pts = convertToPointType(points);
            if (!pts || (pts !== MAX_POINTS && pts < 0)) {
                alert(predicateTitle + " does not have a valid Points value. " +
                "It must be 0, a positive number, or 'MAX'.");
                return false;
            } else if (pts !== MAX_POINTS && pts > rootConfig.maxPoints) {
                baseConfig.points = MAX_POINTS;
            } else {
                baseConfig.points = pts;
            }
                
            baseConfig.enabled = enabled;
            baseConfig.isBonus = isBonus;
            logicConfigOptionToValues.forEach((val, key) => rootConfig.pointPredicateLogicConfiguration.setOptionValue(key, val ?? false));
            void router.invalidate();
            return true;
        };
    }

    const pointPredicateConfigs: ReactElement[] = [];
    for (const [pointPredicateId, baseConfig] of rootConfig.pointPredicateIdToBaseConfiguration.entries()) {

        const generateIncludedPointPredicates = (logicConfig: PointPredicateLogicConfiguration) => {
            return baseConfig.generateIncludedPointPredicates(logicConfig);
        }

        pointPredicateConfigs.push(<PointPredicateConfiguration key={pointPredicateId} pointPredicateId={pointPredicateId}
            maxPoints={maxPoints} generateIncludedPointPredicates={generateIncludedPointPredicates} 
            onPointPredicateConfigSubmit={createOnPointPredicateConfigSubmit(baseConfig)} 
            initEnabled={baseConfig.enabled} initIsBonus={baseConfig.isBonus} initPoints={baseConfig.points + ""}/>)
    }

    return (
    <>
        <h1>Scoring Configuration</h1>
        <div className="card">
            <div id="root-config">
                <h3>Root Config</h3>
                <div id="root-config-description">Top level configuration that applies to all other rules.</div>
                <br />
                <form className="config-form" onSubmit={submit}>
                    <div>
                        <label htmlFor="maxPoints">Max Points: </label>
                        <input type="number" id="maxPoints" value={maxPoints} min="0" onChange={onMaxPointsChange} />
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Save Changes" disabled={submitDisabled}/>
                    </div>
                </form>
            </div>
            <div id="predicate-configs">
                {pointPredicateConfigs}
            </div>
        </div>
    </>
)}

export default ConfigurationEditor