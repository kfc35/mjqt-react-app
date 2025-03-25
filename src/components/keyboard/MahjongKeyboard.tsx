import './MahjongKeyboard.css'
import { BAMBOO_TILES, CHARACTER_TILES, CIRCLE_TILES,
    WIND_TILES, DRAGON_TILES, GENTLEMEN_TILES, SEASON_TILES, Tile, Meld,
    isFlowerTile, maxQuantityPerFlowerTile, maxQuantityPerNonFlowerTile,
    RootPointPredicateConfiguration, evaluateHandForHighestPossiblePointEvaluation, Hand,
    WinContext, WinContextBuilder, RoundContext, WindDirection, MostRecentTileContext,
    isSuitedOrHonorTile, isHongKongTile, HongKongTile, analyzeForWinningHands, SuitedOrHonorTile,
    meldIsPair, Pair, Pong, Kong,
    Chow,
    isSuitedTile,
    type SuitedTile,
    compareTiles,
    getNextSuitedTileValue,
    compareTilesByValueOnly
 } from "mjqt-scoring"
import MahjongTile from "./mahjongTile/MahjongTile"
import { useState, ReactElement } from "react";
import { useRouter, getRouteApi } from '@tanstack/react-router';
import { MeldMode } from './meldModeSelector/MeldMode';
import TileInputBar from './tileInputBar/TileInputBar';
import RoundContextSelector from './roundContextSelector/RoundContextSelector';
import WinContextEditor from './winContextEditor/WinContextEditor';
import MeldModeSelector from './meldModeSelector/MeldModeSelector';

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
    const [meldMode, setMeldMode] = useState<MeldMode | undefined>(undefined);
    const [chowMeldModeTiles, setChowMeldModeTiles] = useState([] as SuitedTile[]);
    const router = useRouter();
    const route = getRouteApi('/');
    const loaderData = route.useLoaderData();
    const exposedPairDisabled = tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Meld && meldIsPair(tileOrMeld) && tileOrMeld.exposed).length > 0;

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

    function createOnButtonClickSetMeldMode(newMeldMode: MeldMode | undefined) {
        return () => {
            if ((meldMode === MeldMode.EXPOSED_CHOW || meldMode === MeldMode.CONCEALED_CHOW) && 
                !(newMeldMode === MeldMode.EXPOSED_CHOW || newMeldMode === MeldMode.CONCEALED_CHOW)) {
                    setChowMeldModeTiles([]);
            }
            setMeldMode(newMeldMode);
        }
    }

    function onWinContextUpdate(newWinContext: WinContext) {
        if (newWinContext.winByKongOnKongReplacement) {
            newWinContext.winByKongReplacement = true;
        }
        if (newWinContext.winByFlowerOnFlowerReplacement) {
            newWinContext.winByFlowerReplacement = true;
        }
        setWinContext(newWinContext);
    }

    function onLastInputtedTileIsSelfDrawnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLastInputtedTileIsSelfDrawn(event.currentTarget.checked);
    }

    function createOnTileClickPushToCorrectField(tile: Tile) {
        return () => {
            const numTiles = tilesAndMelds
                .filter(tileOrMeld => tileOrMeld instanceof Meld || !isFlowerTile(tileOrMeld))
                .map(tileOrMeld => tileOrMeld instanceof Meld ? tileOrMeld.tiles.length : 1)
                .reduce<number>((accum, num) => num + accum, 0);
            if (numTiles >= 18) {
                alert("The max number of non flower tiles in your hand is 18. You cannot add any more tiles.");
                return;
            }
            const nextTilesAndMelds = [...tilesAndMelds];
            if (!meldMode || isFlowerTile(tile)) {
                nextTilesAndMelds.push(tile);
                setTilesAndMelds(nextTilesAndMelds);
            } else if (isSuitedOrHonorTile(tile)) {
                switch (meldMode) {
                    case MeldMode.CONCEALED_PAIR:
                    case MeldMode.EXPOSED_PAIR:
                        if (numTiles + 2 > 18) {
                            alert("The max number of non flower tiles in your hand would be over 18. You cannot add a pair.");
                            return;
                        }
                        nextTilesAndMelds.push(new Pair(tile, meldMode === MeldMode.EXPOSED_PAIR));
                        break;
                    case MeldMode.CONCEALED_PONG:
                    case MeldMode.EXPOSED_PONG:
                        if (numTiles + 3 > 18) {
                            alert("The max number of non flower tiles in your hand would be over 18. You cannot add a pong.");
                            return;
                        }
                        nextTilesAndMelds.push(new Pong(tile, meldMode === MeldMode.EXPOSED_PONG));
                        break;
                    case MeldMode.CONCEALED_KONG:
                    case MeldMode.EXPOSED_KONG:
                        if (numTiles + 4 > 18) {
                            alert("The max number of non flower tiles in your hand would be over 18. You cannot add a kong.");
                            return;
                        }
                        nextTilesAndMelds.push(new Kong(tile, meldMode === MeldMode.EXPOSED_KONG));
                        break;
                    case MeldMode.CONCEALED_CHOW:
                    case MeldMode.EXPOSED_CHOW:
                        if (numTiles + 3 > 18) {
                            alert("The max number of non flower tiles in your hand would be over 18. You cannot add a chow.");
                            return;
                        }
                        if (!isSuitedTile(tile)) {
                            alert("Chows can only contain suited tiles.");
                            return;
                        }
                        if (chowMeldModeTiles.length === 0) {
                            setChowMeldModeTiles([tile]);
                        } else if (chowMeldModeTiles.length === 1) {
                            setChowMeldModeTiles([chowMeldModeTiles[0], tile]);
                        } else if (chowMeldModeTiles.length === 2) {
                            const chowTiles = [...chowMeldModeTiles, tile].sort(compareTilesByValueOnly) as [SuitedTile, SuitedTile, SuitedTile];
                            if (getNextSuitedTileValue(chowTiles[0].value) === chowTiles[1].value && 
                                getNextSuitedTileValue(chowTiles[1].value) === chowTiles[2].value) {
                                    nextTilesAndMelds.push(new Chow([chowMeldModeTiles[0], chowMeldModeTiles[1], tile], meldMode === MeldMode.EXPOSED_CHOW));
                                    setChowMeldModeTiles([]);
                                }
                            else {
                                alert("Your chow is not a consecutive run.");
                                return;
                            }
                        }
                }
                setTilesAndMelds(nextTilesAndMelds);
            } else {
                alert("Invalid tile.");
                return;
            }

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
        const selectedQuantity = tilesAndMelds
            .map(tileOrMeld => tileOrMeld instanceof Tile ? [tileOrMeld] : tileOrMeld.tiles)
            .reduce<Tile[]>((accum, list) => accum.concat(list), [])
            .filter(selectedTile => selectedTile.equals(tile)).length;
        if (!meldMode) {
            return selectedQuantity >= maxQuantityPerNonFlowerTile;
        }
        switch (meldMode) {
            case MeldMode.CONCEALED_PAIR:
            case MeldMode.EXPOSED_PAIR:
                return maxQuantityPerNonFlowerTile - selectedQuantity < 2;
            case MeldMode.CONCEALED_CHOW:
            case MeldMode.EXPOSED_CHOW:
                if (chowMeldModeTiles.length <= 0) {
                    return !isSuitedTile(tile) || maxQuantityPerNonFlowerTile - selectedQuantity < 1;
                }
                return !isSuitedTile(tile) || maxQuantityPerNonFlowerTile - selectedQuantity < 1 || 
                    tile.group !== chowMeldModeTiles[0].group ||
                    chowMeldModeTiles.filter(chowTile => chowTile.equals(tile)).length > 0 || 
                    chowMeldModeTiles[0].value - 2 > tile.value || chowMeldModeTiles[0].value + 2 < tile.value
            case MeldMode.CONCEALED_PONG:
            case MeldMode.EXPOSED_PONG:
                return maxQuantityPerNonFlowerTile - selectedQuantity < 3;
            case MeldMode.CONCEALED_KONG:
            case MeldMode.EXPOSED_KONG:
                return maxQuantityPerNonFlowerTile - selectedQuantity < 4;
            default:
                return true;
        }
    }

    function convertTilesToReactElement(tiles: Tile[]): ReactElement[] {
        const elements: ReactElement[] = [];
        for (const tile of tiles) {
            const key = (tile.group + "-" + tile.value).toLowerCase();
            elements.push(<MahjongTile tile={tile} key={key} onTileClick={createOnTileClickPushToCorrectField(tile)} 
                disabled={tileButtonDisabled(tile)} />);
        }
        return elements;
    }

    function onSubmit() {
        const tiles: HongKongTile[] = tilesAndMelds
            .map(tileOrMeld => tileOrMeld instanceof Tile ? [tileOrMeld] : tileOrMeld.tiles)
            .reduce<Tile[]>((accum, tiles) => accum.concat(tiles), [])
            .filter(tile => isHongKongTile(tile));
        const userSpecifiedMelds: Meld[] = tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Meld);
        const suitedOrHonorTiles: SuitedOrHonorTile[] = tiles
            .filter(tile => !isFlowerTile(tile))
            .filter(tile => isSuitedOrHonorTile(tile));
        if (suitedOrHonorTiles.length < 14) {
            alert("You need at least 14 tiles to submit.");
            return;
        }
        const lastTile = suitedOrHonorTiles[suitedOrHonorTiles.length-1];

        const winningHands = analyzeForWinningHands(new Hand(tiles, new MostRecentTileContext(lastTile, lastInputtedTileIsSelfDrawn), userSpecifiedMelds));
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
        setChowMeldModeTiles([]);
        setMeldMode(undefined);
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
        <div className="sticky-section">
        <TileInputBar tilesAndMelds={tilesAndMelds} chowMeldModeTiles={chowMeldModeTiles} createOnTileClickSplice={createOnTileClickSpliceFromTilesAndMelds} />
            <div id="last-inputted-tile-config">
            <label htmlFor="lastInputtedTileIsSelfDrawn">Last Inputted Tile is Self Drawn: </label>
            <input type="checkbox" id="lastInputtedTileIsSelfDrawn" checked={lastInputtedTileIsSelfDrawn} onChange={onLastInputtedTileIsSelfDrawnChange} />
            </div>
            <div id="calculator-submit-clear">
            <button id="calculator-submit" onClick={onSubmit} disabled={submitDisabled}>Submit</button>
            {'     '}
            <button id="calculator-clear" onClick={onClear} disabled={clearDisabled}>Clear</button>
            </div>
        </div>
        <MeldModeSelector meldMode={meldMode} exposedPairDisabled={exposedPairDisabled} createOnButtonClickSetMeldMode={createOnButtonClickSetMeldMode}/>
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