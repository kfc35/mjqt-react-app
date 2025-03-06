import { PointEvaluation, MeldBasedWinningHand, WinningHand } from 'mjqt-scoring'
import mahjongTileToUnicodeMap from '../../keyboard/mahjongTile/mahjongTileUnicodeMap';
import { ReactElement } from 'react';
import './ResultsDisplay.css'

interface ResultsDisplayProps {
    pointEval: PointEvaluation
}

function ResultsDisplay(props: ResultsDisplayProps) {
    const winningHand = props.pointEval.winningHand;

    return <>
        {winningHandToElement(winningHand)}
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