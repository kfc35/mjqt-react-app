import { Route } from '../../routes/config';
import { RootPointPredicateConfiguration } from 'mjqt-scoring';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

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
        } else if (event.currentTarget.valueAsNumber < 0)  {
            setMaxPoints(Math.abs(event.currentTarget.valueAsNumber));
        } else {
            setMaxPoints(event.currentTarget.valueAsNumber);
        }
    }

    return (
    <>
        <form onSubmit={submit}>
            <div>
                <label htmlFor="maxPoints">Max Points: </label>
                <input type="number" id="maxPoints" value={maxPoints} 
                    onChange={onMaxPointsChange} />
            </div>
            <input type="submit" value="Save Changes" />
        </form>
        
        <p></p>
    </>
)}

export default ConfigurationEditor