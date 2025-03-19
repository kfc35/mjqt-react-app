import './MahjongKeyboard.css'
import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES, GENTLEMEN_TILES, SEASON_TILES, Tile, Meld,
    isFlowerTile, maxQuantityPerFlowerTile, maxQuantityPerNonFlowerTile,
    RootPointPredicateConfiguration, evaluateHandForHighestPossiblePointEvaluation, Hand,
    WinContext, RoundContext, WindDirection, MostRecentTileContext,
    isSuitedOrHonorTile, isHongKongTile, HongKongTile, analyzeForWinningHands, SuitedOrHonorTile,
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import { useState, ReactElement } from "react";
import { useRouter, getRouteApi } from '@tanstack/react-router';
import TileInputBar from './tileInputBar/TileInputBar';

interface MahjongKeyboardProps {
    rootConfig: RootPointPredicateConfiguration;
}

function MahjongKeyboard(props: MahjongKeyboardProps) {
    const [tilesAndMelds, setTilesAndMelds] = useState([] as (Tile | Meld)[]);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [clearDisabled, setClearDisabled] = useState(true);
    const router = useRouter();
    const route = getRouteApi('/');
    const loaderData = route.useLoaderData();

    function createOnTileClickPush(tile: Tile) {
        return () => {
            const nextTilesAndMelds = [...tilesAndMelds, tile];
            setTilesAndMelds(nextTilesAndMelds);

            const nonFlowerTiles = nextTilesAndMelds
            .map(tileOrMeld => tileOrMeld instanceof Tile ? [tileOrMeld] : tileOrMeld.tiles)
            .reduce<Tile[]>((accum, tiles) => accum.concat(tiles), [])
            .filter(tile => !isFlowerTile(tile))

            if (nonFlowerTiles.length < 14) {
                setSubmitDisabled(true);
            } else {
                setSubmitDisabled(false);
            }
            setClearDisabled(false);
        };
    }

    function createOnTileClickSplice(index: number) {
        return () => {
            const nextTilesAndMelds = [...tilesAndMelds];
            nextTilesAndMelds.splice(index, 1);
            setTilesAndMelds(nextTilesAndMelds);

            const nonFlowerTiles = nextTilesAndMelds
            .map(tileOrMeld => tileOrMeld instanceof Tile ? [tileOrMeld] : tileOrMeld.tiles)
            .reduce<Tile[]>((accum, tiles) => accum.concat(tiles), [])
            .filter(tile => !isFlowerTile(tile))

            if (nonFlowerTiles.length < 14) {
                setSubmitDisabled(true);
            } else {
                setSubmitDisabled(false);
            }
            if (nextTilesAndMelds.length === 0) {
                setClearDisabled(true);
            }
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

    function onSubmit() {
        const tiles: HongKongTile[] = tilesAndMelds
            .map(tileOrMeld => tileOrMeld instanceof Tile ? [tileOrMeld] : tileOrMeld.tiles)
            .reduce<Tile[]>((accum, tiles) => accum.concat(tiles), [])
            .filter(tile => isHongKongTile(tile));
        const suitedOrHonorTiles: SuitedOrHonorTile[] = tiles
            .filter(tile => !isFlowerTile(tile))
            .filter(tile => isSuitedOrHonorTile(tile));
        if (suitedOrHonorTiles.length < 14) {
            alert("You need at least 14 tiles to submit.");
            return;
        }
        const lastTile = suitedOrHonorTiles[suitedOrHonorTiles.length-1];

        // TODO going to need to figure out this API to make this easier.
        const winningHands = analyzeForWinningHands(new Hand(tiles, new MostRecentTileContext(lastTile, true)));
        console.log(JSON.stringify(winningHands));
        const pointEval = evaluateHandForHighestPossiblePointEvaluation(new Hand(tiles, new MostRecentTileContext(lastTile, true)), 
            (new WinContext.Builder()).build(), 
            new RoundContext(WindDirection.EAST, WindDirection.EAST),
            props.rootConfig);
        if (loaderData.mostRecentPointEvaluations.length > 0) {
            loaderData.mostRecentPointEvaluations.splice(0, loaderData.mostRecentPointEvaluations.length);
        }
        if (pointEval) {
            loaderData.mostRecentPointEvaluations.push(pointEval);
            void router.invalidate();
            void router.navigate({ to: '/results'});
        } else {
            alert("Unsuccessful result. Check your hand and try again.");
            return
        }
    }

    function onClear() {
        setTilesAndMelds([]);
        setSubmitDisabled(true);
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
        <div>
            <button id="calculator-submit" onClick={onSubmit} disabled={submitDisabled}>Submit</button>
            { }
            <button id="calculator-clear" onClick={onClear} disabled={clearDisabled}>Clear</button>
        </div>
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