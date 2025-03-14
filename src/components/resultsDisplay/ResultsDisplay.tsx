import { MeldBasedWinningHand, WinningHand, PointEvaluation, PointPredicateResult, PointPredicateSingleSuccessResult, PointPredicateFailureResult, type RootPointPredicateConfiguration, MAX_POINTS } from 'mjqt-scoring'
import getUnicodeRepresentation from '../../content/mahjongTileUnicodeMap';
import { ReactElement } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import './ResultsDisplay.css'
import { pointPredicateIdToContentMap } from '../../content/pointPredicateIdToContentMap';
import { subPointPredicateIdToContentMap } from '../../content/subPointPredicateIdToContentMap';

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
            {winningHandToElement(winningHand)}
            <div className="points">
                <p>Points: {pointEval.points}</p>
            </div>
            <div className="results">
                {printResults(pointEval, rootConfig)}
            </div>
        </div>
    </>
}

export default ResultsDisplay

function winningHandToElement(winningHand: WinningHand): ReactElement {
    if (winningHand instanceof MeldBasedWinningHand) {
        const elements = winningHand.melds.map((meld, index) => 
            <div className={"tile-grouping meld " + meld.type.toLowerCase()} key={index}>
                <span className="meld-text">{meld.type.toLowerCase()}: </span>
                {meld.tiles.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    } else {
        const elements = winningHand.tiles.map((tilesList, index) => 
            <div className={"tile-grouping" + (tilesList.length === 2 && tilesList[0].equals(tilesList[1]) ? " pair" : "")} key={index}>
                {tilesList.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    }
}

function printResults(pointEval: PointEvaluation, rootConfig: RootPointPredicateConfiguration): ReactElement {
    const elements: ReactElement[] = [];
    for (const result of pointEval.successResults) {
        const baseConfig = rootConfig.getBaseConfiguration(result.pointPredicateId);
        if (!baseConfig) {
            continue;
        }
        let content = pointPredicateIdToContentMap.get(result.pointPredicateId);
        if (!content) {
            content = subPointPredicateIdToContentMap.get(result.pointPredicateId);
            if (!content) {
                continue;
            }
        }
        if (!pointEval.ignoredPointPredicateIds.has(result.pointPredicateId)) {
            const points: string = baseConfig.points === MAX_POINTS ? rootConfig.maxPoints + " (max)" : baseConfig.points + "";
            elements.push(<div className="success-result" key={result.pointPredicateId}>
                {content.title} - Success: +{points} pt(s)
            </div>);
        }
    }
    for (const result of pointEval.ignoredResults) {
        let content = pointPredicateIdToContentMap.get(result.pointPredicateId);
        if (!content) {
            content = subPointPredicateIdToContentMap.get(result.pointPredicateId);
            if (!content) {
                continue;
            }
        }
        if (result.success) {
            elements.push(<div className="ignored-result" key={result.pointPredicateId}>
                {content.title} - Points ignored (included by other successful result).
            </div>);
            continue;
        }
    }
    for (const result of pointEval.failedResults) {
        let content = pointPredicateIdToContentMap.get(result.pointPredicateId);
        if (!content) {
            content = subPointPredicateIdToContentMap.get(result.pointPredicateId);
            if (!content) {
                continue;
            }
        }
        elements.push(<div className="failure-result" key={result.pointPredicateId}>
            {content.title} - Failure
        </div>);
    }
    return <>
        {elements}
    </>;
}