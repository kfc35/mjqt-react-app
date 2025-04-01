import { MeldBasedWinningHand, WinningHand, PointEvaluation, RootPointPredicateConfiguration } from 'mjqt-scoring'
import getUnicodeRepresentation from '../../content/mahjongTileUnicodeMap';
import { ReactElement } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import './ResultsDisplay.css'
import Result from './Result';
import { ResultType } from './ResultType';

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
            <div className={"tile-grouping meld " + meld.type.toLowerCase() + (meld.exposed ? "" : " concealed")} key={index}>
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