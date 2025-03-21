import { WindDirection, RoundContext, WIND_TILES, windTileToWindDirection } from "mjqt-scoring";
import { ReactElement } from "react";
import MahjongTile from "../mahjongTile/MahjongTile";
import "./RoundContextSelector.css"

interface RoundContextSelectorProps {
    roundContext: RoundContext
    createOnTileClickUpdateSeatWind: (wind: WindDirection) => () => void
    createOnTileClickUpdatePrevailingWind: (wind: WindDirection) => () => void
}

function RoundContextSelector(props: RoundContextSelectorProps) {

    function renderWindSelector(selectedWindDirection: WindDirection, createOnTileClickHandler: (wind: WindDirection) => () => void) {
        const elements: ReactElement[] = [];
        for (const tile of WIND_TILES) {
            const windDirection = windTileToWindDirection(tile);
            const key = (tile.group + "-" + tile.value).toLowerCase();
            elements.push(<MahjongTile tile={tile} key={key} onTileClick={createOnTileClickHandler(windDirection)} 
                selected={selectedWindDirection === windDirection} />);
        }
        return elements;
    }

    return <>
        <div id="round-context-selector">
            <div id="seat-wind-selector" className="wind-selector">
                <h3>Seat Wind</h3>
                {renderWindSelector(props.roundContext.seatWind, props.createOnTileClickUpdateSeatWind)}
            </div>
            {'  '}
            <div id="prevailing-wind-selector" className="wind-selector">
                <h3>Round Wind</h3>
                {renderWindSelector(props.roundContext.prevailingWind, props.createOnTileClickUpdatePrevailingWind)}
            </div>
        </div>
    </>;
}

export default RoundContextSelector