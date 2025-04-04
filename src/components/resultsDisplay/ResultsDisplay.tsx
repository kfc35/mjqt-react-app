import { PointEvaluation, RootPointPredicateConfiguration } from 'mjqt-scoring'
import { ReactElement } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import './ResultsDisplay.css'
import Result from './result/Result';
import { ResultType } from './result/ResultType';
import WinningHandDisplay from './WinningHandDisplay';

function ResultsDisplay() {
    const route = getRouteApi('/results');
    const pointEvals: PointEvaluation[] = route.useLoaderData().mostRecentPointEvaluations;
    const rootConfig: RootPointPredicateConfiguration = route.useLoaderData().rootPointPredicateConfig;
    if (!pointEvals || pointEvals.length === 0) {
        return <div id="empty-results">
            <p>There are no calculator results to display. Your most recent calculator result will appear here.</p>
        </div>
    }
    const pointEval = pointEvals[0];
    const winningHand = pointEval.winningHand;

    return <>
        <div id="results-display">
            <WinningHandDisplay winningHand={winningHand} />
            <div className="points">
                <p>Points: {pointEval.points}</p>
            </div>
            <div className="results">
                {printDetailedResults(pointEval, rootConfig)}
            </div>
        </div>
    </>
}

export default ResultsDisplay

function printDetailedResults(pointEval: PointEvaluation, rootConfig: RootPointPredicateConfiguration): ReactElement {
    const elements: ReactElement[] = [];
    for (const result of pointEval.successUnignoredResults) {
        elements.push(<Result resultType={ResultType.SUCCESS} result={result} rootConfig={rootConfig} key={result.pointPredicateId} />);
    }
    for (const result of pointEval.ignoredResults) {
        elements.push(<Result resultType={ResultType.IGNORED} result={result} rootConfig={rootConfig} key={result.pointPredicateId} />);
    }
    for (const result of pointEval.failedUnignoredResults) {
        elements.push(<Result resultType={ResultType.FAILURE} result={result} rootConfig={rootConfig} key={result.pointPredicateId} />);
    }
    return <>
        {elements}
    </>;
}