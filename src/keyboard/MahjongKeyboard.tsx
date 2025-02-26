import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES,GENTLEMEN_TILES, SEASON_TILES, Tile
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import type { ReactElement } from "react";

function MahjongKeyboard() {
    return (
    <>
        <h3>Honor Tiles</h3>
        <WindTiles />
        <DragonTiles />
        <h3>Suited Tiles</h3>
        <CharacterTiles />
        <BambooTiles />
        <CircleTiles />
        <h3>Flower Tiles</h3>
        <GentlemenTiles />
        <SeasonTiles />
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
        elements.push(<MahjongTile tile={tile} key={tile.group + "-" + tile.value}/>);
    }
    return elements;
}