import { Tile } from "mjqt-scoring";
import { ReactElement } from "react";
import getUnicodeRepresentation from "../../../../content/mahjongTileUnicodeMap";
import "./TileDetail.css";

interface TileDetailProps {
    tilesList: ReadonlyArray<ReadonlyArray<Tile>> | undefined;
}

function TileDetail(props: TileDetailProps) {
    if (!props.tilesList || props.tilesList.length === 0 || props.tilesList.every(tiles => !tiles || tiles.length === 0)) {
        return <></>;
    }
    const elements: ReactElement[] = [];
    for (const [index, tiles] of props.tilesList.entries()) {
        elements.push(<div className="tile-grouping" key={index}>
            {tiles.map(tile => getUnicodeRepresentation(tile)).concat(" ")}
        </div>)
    }
    return <>
        <div className="tile-detail">
            <div className="description">

            </div>
            <div className="tiles">
                {elements}
            </div>
        </div>
    </>
}

export default TileDetail;