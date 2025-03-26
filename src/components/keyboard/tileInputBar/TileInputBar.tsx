import { Meld, isFlowerTile, meldIsKong, meldIsChow, type SuitedOrHonorTile, type FlowerTile, SuitedTile, meldIsPair } from 'mjqt-scoring'
import MahjongTile from '../mahjongTile/MahjongTile';
import { ReactElement } from "react";
import './TileInputBar.css';

interface TileInputBarProps {
  tilesAndMelds: (SuitedOrHonorTile | Meld)[];
  flowerTiles: FlowerTile[];
  chowMeldModeTiles: SuitedTile[];
  lastClickedSuitedOrHonorTile: SuitedOrHonorTile | undefined;
  createOnTileClickSpliceFromTilesAndMeldsOrChowMeldModeTiles: (index: number) => () => void;
  createOnTileClickSpliceFromFlowerTiles: (index: number) => () => void;
}

function TileInputBar(props : TileInputBarProps) {
  const elements = convertNonFlowerTilesAndMeldsToReactElements(props);
  const numTiles = [...props.tilesAndMelds, ...props.chowMeldModeTiles]
    .filter(tileOrMeld => tileOrMeld instanceof Meld || !isFlowerTile(tileOrMeld))
    .map(tileOrMeld => tileOrMeld instanceof Meld ? tileOrMeld.tiles : [tileOrMeld])
    .reduce<number>((accum, tiles) => accum + tiles.length, 0);
  const numKongs = props.tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Meld && meldIsKong(tileOrMeld)).length;
  const maxNumTilesInHand = 14 + numKongs;
  if (numTiles < maxNumTilesInHand) {
    for (const i of Array.from({length: maxNumTilesInHand - numTiles}, (_, k) => k + numTiles)) {
      const key = "placeholder-tile-" + i;
      elements.push(<PlaceholderInputTile key={key} />);
    }
  }

  const flowerElements = convertFlowerTilesToReactElements(props);
  return (
    <>
    <div id="tile-input-bar">
      <div>
        <h2>Inputted Tiles</h2>
        <div className="tile-input-bar-elements">
          {elements}
        </div>
      </div>
      <div>
        <h2>Inputted Flower Tiles</h2>
        <div className="tile-input-bar-elements">
        {flowerElements.length === 0 ? <p>None</p>: flowerElements}
        </div>
      </div>
    </div>
    </>
  )
}
  
export default TileInputBar

function PlaceholderInputTile(): ReactElement {
  return (
    <> 
      <span className="mahjong-tile">&#x1f02b;</span>
    </>
  )
}

function convertFlowerTilesToReactElements(props: TileInputBarProps): ReactElement[] {
  return props.flowerTiles.map((tile, index) => {
      const key = ("tile-input-index-" + index).toLowerCase();
      return <MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSpliceFromFlowerTiles(index)}/>
  });
}
  
function convertNonFlowerTilesAndMeldsToReactElements(props: TileInputBarProps): ReactElement[] {
  const elements : ReactElement[] = [];
  for (const [index, tileOrMeld] of props.tilesAndMelds.entries()) {
    if (tileOrMeld instanceof Meld) {
      const meldElements : ReactElement[] = [];
      for (const [secondIndex, tile] of tileOrMeld.tiles.entries()) {
        const key = ("tile-input-index-" + index + "-" + secondIndex).toLowerCase();
        const highlighted = (props.chowMeldModeTiles.length === 0 || (meldIsPair(tileOrMeld) && tileOrMeld.exposed)) 
          && index === props.tilesAndMelds.length - 1 && 
          ((meldIsChow(tileOrMeld) && tile.equals(props.lastClickedSuitedOrHonorTile)) || 
          (secondIndex === tileOrMeld.tiles.length - 1 && tile.equals(props.lastClickedSuitedOrHonorTile)))
        meldElements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSpliceFromTilesAndMeldsOrChowMeldModeTiles(index)} highlighted={highlighted}
        />);
      }
      const className = "tile-grouping meld " + tileOrMeld.type.toLowerCase() + (tileOrMeld.exposed ? "" : " concealed");
      elements.push(<div key={"meld-" + index} className={className}>{meldElements}</div>);
    } else {
      const key = ("tile-input-index-" + index).toLowerCase();
      const highlighted = props.chowMeldModeTiles.length === 0 && index === props.tilesAndMelds.length - 1 && tileOrMeld.equals(props.lastClickedSuitedOrHonorTile);
      elements.push(<MahjongTile tile={tileOrMeld} key={key} onTileClick={props.createOnTileClickSpliceFromTilesAndMeldsOrChowMeldModeTiles(index)} highlighted={highlighted} />);
    } 
  }
  // append any pending chow tiles at the end
  for (const [index, tile] of props.chowMeldModeTiles.entries()) {
    const key = ("tile-input-index-" + (props.tilesAndMelds.length + index)).toLowerCase();
    const highlighted = index === props.chowMeldModeTiles.length - 1 && tile.equals(props.lastClickedSuitedOrHonorTile);
    elements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSpliceFromTilesAndMeldsOrChowMeldModeTiles(props.tilesAndMelds.length + index)} highlighted={highlighted} />);
  }
  return elements;
}