import './MahjongKeyboard.css'
import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES, GENTLEMEN_TILES, SEASON_TILES, Tile, Meld,
    isFlowerTile, maxQuantityPerFlowerTile, maxQuantityPerNonFlowerTile,
    RootPointPredicateConfiguration, evaluateHandForHighestPossiblePointEvaluation, Hand,
    WinContext, WinContextBuilder, RoundContext, WindDirection, MostRecentTileContext,
    isSuitedOrHonorTile, isHongKongTile, HongKongTile, analyzeForWinningHands, SuitedOrHonorTile,
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import { useState, ReactElement } from "react";
import { useRouter, getRouteApi } from '@tanstack/react-router';
import TileInputBar from './tileInputBar/TileInputBar';
import RoundContextSelector from './roundContextSelector/RoundContextSelector';
import WinContextEditor from './winContextEditor/WinContextEditor';

interface MahjongKeyboardProps {
    rootConfig: RootPointPredicateConfiguration
}

function MahjongKeyboard(props: MahjongKeyboardProps) {
    const [tilesAndMelds, setTilesAndMelds] = useState([] as (Tile | Meld)[]);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [clearDisabled, setClearDisabled] = useState(true);
    const [roundContext, setRoundContext] = useState(new RoundContext(WindDirection.EAST, WindDirection.EAST));
    const [winContext, setWinContext] = useState(new WinContextBuilder().build());
    const [lastInputtedTileIsSelfDrawn, setLastInputtedTileIsSelfDrawn] = useState(true);
    //const [meldSelectorMode, setMeldSelectorMode] = useState(undefined);
    const router = useRouter();
    const route = getRouteApi('/');
    const loaderData = route.useLoaderData();

    function createOnTileClickUpdateSeatWind(seatWind: WindDirection) {
        return () => {
            const newRoundContext = new RoundContext(roundContext.prevailingWind, seatWind);
            setRoundContext(newRoundContext);
        };
    }

    function createOnTileClickUpdatePrevailingWind(prevailingWind: WindDirection) {
        return () => {
            const newRoundContext = new RoundContext(prevailingWind, roundContext.seatWind);
            setRoundContext(newRoundContext);
        };
    }

    function onWinContextUpdate(newWinContext: WinContext) {
        setWinContext(newWinContext);
    }

    function onLastInputtedTileIsSelfDrawnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLastInputtedTileIsSelfDrawn(event.currentTarget.checked);
    }

    function createOnTileClickPushToTilesAndMelds(tile: Tile) {
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

    function createOnTileClickSpliceFromTilesAndMelds(index: number) {
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
            elements.push(<MahjongTile tile={tile} key={key} onTileClick={createOnTileClickPushToTilesAndMelds(tile)} 
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

        const winningHands = analyzeForWinningHands(new Hand(tiles, new MostRecentTileContext(lastTile, lastInputtedTileIsSelfDrawn)));
        console.log(JSON.stringify(winningHands));
        const pointEval = evaluateHandForHighestPossiblePointEvaluation(new Hand(tiles, new MostRecentTileContext(lastTile, lastInputtedTileIsSelfDrawn)), 
            winContext, 
            roundContext,
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
        <TileInputBar tilesAndMelds={tilesAndMelds} createOnTileClickSplice={createOnTileClickSpliceFromTilesAndMelds} />
        <div>
            <div id="last-inputted-tile-config">
            <label htmlFor="lastInputtedTileIsSelfDrawn">Last Inputted Tile is Self Drawn: </label>
            <input type="checkbox" id="lastInputtedTileIsSelfDrawn" checked={lastInputtedTileIsSelfDrawn} onChange={onLastInputtedTileIsSelfDrawnChange} />
            </div>
            <div>
            <button id="calculator-submit" onClick={onSubmit} disabled={submitDisabled}>Submit</button>
            {'     '}
            <button id="calculator-clear" onClick={onClear} disabled={clearDisabled}>Clear</button>
            </div>
        </div>
        <div id="tile-buttons">
            <div className="button-section" id="flower-tile-buttons">
                <h3>Flower Tiles</h3>
                <GentlemenTiles  />
                <SeasonTiles />
            </div>
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
        </div>
        <RoundContextSelector roundContext={roundContext} createOnTileClickUpdateSeatWind={createOnTileClickUpdateSeatWind} 
            createOnTileClickUpdatePrevailingWind={createOnTileClickUpdatePrevailingWind} />
        <WinContextEditor winContext={winContext} onWinContextUpdate={onWinContextUpdate} />
    </>
    )
}
  
export default MahjongKeyboard