import './MahjongKeyboard.css'
import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES,GENTLEMEN_TILES, SEASON_TILES, Tile
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import type { ReactElement } from "react";

export function MahjongKeyboardTable() {
    return (
    <>
        <table>
            <tr>
                <th>Honor Tiles</th>
                <th>Suited Tiles</th>
                <th>Flower Tiles</th>
            </tr>
            <tr>
                <td><WindTiles /></td>
                <td><CharacterTiles /></td>
                <td><GentlemenTiles /></td>
            </tr>
            <tr>
                <td><DragonTiles /></td>
                <td><BambooTiles /></td>
                <td><SeasonTiles /></td>
            </tr>
            <tr>
                <td></td>
                <td><CircleTiles /></td>
                <td></td>
            </tr>
        </table>
    </>
    )
}

function MahjongKeyboard() {
    return (
    <>
        <div id="tile-buttons">
        <div className="button-section" id="honor-tile-buttons">
            <h3>Honor Tiles</h3>
            <WindTiles />
            <DragonTiles />
        </div >
        <div className="button-section" id="suited-tile-buttons">
            <h3>Suited Tiles</h3>
            <CharacterTiles />
            <BambooTiles />
            <CircleTiles />
        </div>
        <div className="button-section" id="flower-tile-buttons">
            <h3>Flower Tiles</h3>
            <GentlemenTiles />
            <SeasonTiles />
        </div>
        </div>
    </>
    )
}
  
export default MahjongKeyboard

function WindTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(WIND_TILES)}
        </div>
    </>
    )
}

function DragonTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(DRAGON_TILES)}
        </div>
    </>
    )
}

function CharacterTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(CHARACTER_TILES)}
        </div>
    </>
    )
}

function BambooTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(BAMBOO_TILES)}
        </div>
    </>
    )
}

function CircleTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(CIRCLE_TILES)}
        </div>
    </>
    )
}

function GentlemenTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(GENTLEMEN_TILES)}
        </div>
    </>
    )
}

function SeasonTiles() {
    return (
    <>
        <div className="keyboard-row">
        {convertTilesToReactElement(SEASON_TILES)}
        </div>
    </>
    )
}

function convertTilesToReactElement(tiles: Tile[]): ReactElement[] {
    const elements: ReactElement[] = [];
    for (const tile of tiles) {
        const key = (tile.group + "-" + tile.value).toLowerCase();
        elements.push(<MahjongTile tile={tile} key={key}/>);
    }
    return elements;
}