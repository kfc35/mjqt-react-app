import { MeldBasedWinningHand, WinningHand, PointEvaluation, PointPredicateResult, PointPredicateSingleSuccessResult, PointPredicateFailureResult } from 'mjqt-scoring'
import mahjongTileToUnicodeMap from '../../keyboard/mahjongTile/mahjongTileUnicodeMap';
import { ReactElement } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import './ResultsDisplay.css'
import { pointPredicateIdToContentMap } from '../configEditor/pointPredicateIdToContentMap';
import { subPointPredicateIdToContentMap } from '../configEditor/subPointPredicateIdToContentMap';

function ResultsDisplay() {
    const route = getRouteApi('/results');
    const pointEval: PointEvaluation | undefined = route.useLoaderData().mostRecentPointEvaluation;
    if (!pointEval) {
        return <div id="empty-results">
            <p>There are no calculator results to display. Your most recent calculator result will appear here.</p>
        </div>
    }
    const winningHand = pointEval.winningHand;
    pointEval.successResults

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
        return <div className="winning-hand">
            {winningHand.melds.map(meld => 
                <div className={"tile-grouping meld " + meld.type.toLowerCase()}>
                    {meld.tiles.map(tile => mahjongTileToUnicodeMap.get(tile)).join(" ")}
                </div>).join("\n")}
            </div>
    } else {
        return <div className="winning-hand">
            {winningHand.tiles.map(tilesList => 
                <div className="tile-grouping">
                    {tilesList.map(tile => mahjongTileToUnicodeMap.get(tile)).join(" ")}
                </div>).join("\n")}
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
            elements.push(<div className="success-result">
                {content.title} - Success
            </div>);
        }
        if (result instanceof PointPredicateFailureResult) {
            elements.push(<div>
                {content.title} - Failure
            </div>);
        }
    }
    return <>
        {elements}
    </>;
}