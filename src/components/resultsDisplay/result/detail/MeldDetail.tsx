import { Meld } from "mjqt-scoring";
import { ReactElement } from "react";
import getUnicodeRepresentation from "../../../../content/mahjongTileUnicodeMap";

interface MeldDetailProps {
    melds: readonly Meld[] | undefined;
}

function MeldDetail(props: MeldDetailProps) {
    if (!props.melds || props.melds.length === 0) {
        return <></>;
    }
    const elements: ReactElement[] = [];
    for (const [index, meld] of props.melds.entries()) {
        elements.push(<div className="meld" key={index}>
            {meld.tiles.map(tile => getUnicodeRepresentation(tile)).concat(" ")}
        </div>)
    }
    return <>
        <div className="tile-detail">
            <div className="description">
                
            </div>
            <div className="melds">
                {elements}
            </div>
        </div>
    </>
}

export default MeldDetail;