import { Route } from '../../routes/config';
import { RootPointPredicateConfiguration } from 'mjqt-scoring';
import { useRouter } from '@tanstack/react-router';
import { useState, ReactElement } from 'react';
import PointPredicateConfiguration from './PointPredicateConfiguration';

function ConfigurationEditor() {
    const rootConfig: RootPointPredicateConfiguration = Route.useLoaderData().rootPointPredicateConfig;
    const [maxPoints, setMaxPoints] = useState(rootConfig.maxPoints);

    const router = useRouter();

    function submit(event: React.FormEvent) {
        event.preventDefault();
        rootConfig.maxPoints = maxPoints;
        router.invalidate();

        console.log("Saved");
    }

    function onMaxPointsChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (isNaN(event.currentTarget.valueAsNumber)) {
            setMaxPoints(0);
        } else {
            setMaxPoints(event.currentTarget.valueAsNumber);
        }
    }

    const pointPredicateConfigs: ReactElement[] = [];
    for (const [pointPredicateId, baseConfig] of rootConfig.pointPredicateIdToBaseConfiguration.entries()) {
        pointPredicateConfigs.push(<PointPredicateConfiguration key={pointPredicateId} 
            pointPredicateId={pointPredicateId} baseConfig={baseConfig} maxPoints={maxPoints} />)
    }

    return (
    <>
        <form onSubmit={submit}>
            <div>
                <label htmlFor="maxPoints">Max Points: </label>
                <input type="number" id="maxPoints" value={maxPoints} min="0" onChange={onMaxPointsChange} />
            </div>
            {pointPredicateConfigs}
            <input type="submit" value="Save Changes" />
        </form>
        
        <p></p>
    </>
)}

export default ConfigurationEditor