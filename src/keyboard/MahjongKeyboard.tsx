import './MahjongKeyboard.css'
import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES, GENTLEMEN_TILES, SEASON_TILES, Tile, Meld,
    isFlowerTile, maxQuantityPerFlowerTile, maxQuantityPerNonFlowerTile,
    type RootPointPredicateConfiguration
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import { useState, ReactElement } from "react";
import TileInputBar from './tileInputBar/TileInputBar';

interface MahjongKeyboardProps {
    rootConfig: RootPointPredicateConfiguration;
}

function MahjongKeyboard(props: MahjongKeyboardProps) {
    props;
    const [tilesAndMelds, setTilesAndMelds] = useState([] as (Tile | Meld)[]);

    function createOnTileClickPush(tile: Tile) {
        return () => {
            const nextTilesAndMelds = [...tilesAndMelds, tile];
            setTilesAndMelds(nextTilesAndMelds);
        };
    }

    function createOnTileClickSplice(index: number) {
        return () => {
            const nextTilesAndMelds = [...tilesAndMelds];
            nextTilesAndMelds.splice(index, 1);
            setTilesAndMelds(nextTilesAndMelds);
        }
    }

    function tileButtonDisabled(tile: Tile) {
        if (isFlowerTile(tile)) {
            return tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Tile && tileOrMeld.equals(tile)).length >= maxQuantityPerFlowerTile;
        }
        return tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Tile && tileOrMeld.equals(tile)).length >= maxQuantityPerNonFlowerTile;
    }

    function convertTilesToReactElement(tiles: Tile[]): ReactElement[] {
        const elements: ReactElement[] = [];
        for (const tile of tiles) {
            const key = (tile.group + "-" + tile.value).toLowerCase();
            elements.push(<MahjongTile tile={tile} key={key} onTileClick={createOnTileClickPush(tile)} 
                disabled={tileButtonDisabled(tile)} />);
        }
        return elements;
    }

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

    return (
    <>
        <TileInputBar tilesAndMelds={tilesAndMelds} createOnTileClickSplice={createOnTileClickSplice}/>
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
                <GentlemenTiles  />
                <SeasonTiles />
            </div>
        </div>
    </>
    )
}
  
export default MahjongKeyboard