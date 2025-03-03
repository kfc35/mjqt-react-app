import { getRouteApi } from '@tanstack/react-router'
import { RootPointPredicateConfiguration } from 'mjqt-scoring';
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
        router.invalidate();
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

    const pointPredicateConfigs: ReactElement[] = [];
    for (const [pointPredicateId, _] of rootConfig.pointPredicateIdToBaseConfiguration.entries()) {
        pointPredicateConfigs.push(<PointPredicateConfiguration key={pointPredicateId} pointPredicateId={pointPredicateId}
            maxPoints={maxPoints} />)
    }

    return (
    <>
        <h1>Scoring Configuration</h1>
        <div className="card">
            <div id="root-config">
                <h3>Root Config</h3>
                <div className="config-description">Top level configuration that applies to all other rules.</div>
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