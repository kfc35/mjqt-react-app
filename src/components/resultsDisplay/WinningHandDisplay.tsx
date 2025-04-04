import { WinningHand, MeldBasedWinningHand } from "mjqt-scoring";
import getUnicodeRepresentation from "../../content/mahjongTileUnicodeMap";
import { ReactElement } from "react";
import './WinningHandDisplay.css';

interface WinningHandProps {
    winningHand: WinningHand
}


function WinningHandDisplay(props: WinningHandProps): ReactElement {
    if (props.winningHand instanceof MeldBasedWinningHand) {
        const elements = props.winningHand.melds.map((meld, index) => 
            <div className={"tile-grouping meld " + meld.type.toLowerCase() + (meld.exposed ? "" : " concealed")} key={index}>
                <span className="meld-text">{meld.type.toLowerCase()}: </span>
                {meld.tiles.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    } else {
        const elements = props.winningHand.tiles.map((tilesList, index) => 
            <div className={"tile-grouping" + (tilesList.length === 2 && tilesList[0].equals(tilesList[1]) ? " pair" : "")} key={index}>
                {tilesList.map(tile => getUnicodeRepresentation(tile)).join(" ")}
            </div>);
        return <div className="winning-hand">
            {elements}
            </div>
    }
}

export default WinningHandDisplay;