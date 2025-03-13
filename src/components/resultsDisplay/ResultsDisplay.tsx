import { MeldBasedWinningHand, WinningHand, PointEvaluation, PointPredicateResult, PointPredicateSingleSuccessResult, PointPredicateFailureResult } from 'mjqt-scoring'
import getUnicodeRepresentation from '../../content/mahjongTileUnicodeMap';
import { ReactElement } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import './ResultsDisplay.css'
import { pointPredicateIdToContentMap } from '../../content/pointPredicateIdToContentMap';
import { subPointPredicateIdToContentMap } from '../../content/subPointPredicateIdToContentMap';

function ResultsDisplay() {
    const route = getRouteApi('/results');
    const pointEvals: PointEvaluation[] = route.useLoaderData().mostRecentPointEvaluations;
    if (!pointEvals || pointEvals.length === 0) {
        return <div id="empty-results">
            <p>There are no calculator results to display. Your most recent calculator result will appear here.</p>
        </div>
    }
    const pointEval = pointEvals[0];
    const winningHand = pointEval.winningHand;

    return <>
        <div className="point-evaluation">
            {winningHandToElement(winningHand)}
            <div className="points">
                <p>Points: {pointEval.points}</p>
            </div>
            <div className="results">
                {printResults(pointEval.successResults)}
                {printResults(pointEval.ignoredResults)}
                {printResults(pointEval.failedResults)}
            </div>
        </div>
    </>
}

export default ResultsDisplay

function winningHandToElement(winningHand: WinningHand): ReactElement {
    if (winningHand instanceof MeldBasedWinningHand) {
        const elements = winningHand.melds.map((meld, index) => 
            <div className={"tile-grouping meld " + meld.type.toLowerCase()} key={index}>
                {meld.tiles.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    } else {
        const elements = winningHand.tiles.map((tilesList, index) => 
            <div className="tile-grouping" key={index}>
                {tilesList.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    }
}

function printResults(results: PointPredicateResult[]): ReactElement {
    const elements: ReactElement[] = [];
    for (const result of results) {
        let content = pointPredicateIdToContentMap.get(result.pointPredicateId);
        if (!content) {
            content = subPointPredicateIdToContentMap.get(result.pointPredicateId);
            if (!content) {
                continue;
            }
        }
        if (result instanceof PointPredicateSingleSuccessResult) {
            elements.push(<div className="success-result" key={result.pointPredicateId}>
                {content.title} - Success
            </div>);
        }
        if (result instanceof PointPredicateFailureResult) {
            elements.push(<div className="failure-result" key={result.pointPredicateId}>
                {content.title} - Failure
            </div>);
        }
    }
    return <>
        {elements}
    </>;
}