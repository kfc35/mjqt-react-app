import { Tile, Meld, isFlowerTile, meldIsKong } from 'mjqt-scoring'
import MahjongTile from '../mahjongTile/MahjongTile';
import { ReactElement } from "react";
import './TileInputBar.css';

interface TileInputBarProps {
  tilesAndMelds: (Tile | Meld)[];
  chowMeldModeTiles: Tile[];
  createOnTileClickSplice: (index: number) => () => void;
}

function TileInputBar(props : TileInputBarProps) {
  const elements = convertNonFlowerTilesAndMeldsToReactElements(props);
  const numTiles = props.tilesAndMelds
    .filter(tileOrMeld => tileOrMeld instanceof Meld || !isFlowerTile(tileOrMeld))
    .map(tileOrMeld => tileOrMeld instanceof Meld ? tileOrMeld.tiles : [tileOrMeld])
    .reduce<number>((accum, tiles) => accum + tiles.length, 0);
  const numKongs = props.tilesAndMelds.filter(tileOrMeld => tileOrMeld instanceof Meld && meldIsKong(tileOrMeld)).length;
  const maxNumTilesInHand = 14 + numKongs;
  console.log(numKongs);
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
  return props.tilesAndMelds.map((tileOrMeld, index) => [tileOrMeld, index] as [Tile | Meld, number])
    .filter(([tileOrMeld,]) => tileOrMeld instanceof Tile && isFlowerTile(tileOrMeld))
    .map(([tile, index]) => [tile, index] as [Tile, number])
    .map(([tile, index]) => {
      const key = ("tile-input-index-" + index).toLowerCase();
      return <MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSplice(index)}/>
  });
}
  
function convertNonFlowerTilesAndMeldsToReactElements(props: TileInputBarProps): ReactElement[] {
  const elements : ReactElement[] = [];
  for (const [index, tileOrMeld] of props.tilesAndMelds.entries()) {
    if (tileOrMeld instanceof Meld) {
      const meldElements : ReactElement[] = [];
      for (const [secondIndex, tile] of tileOrMeld.tiles.entries()) {
        const key = ("tile-input-index-" + index + "-" + secondIndex).toLowerCase();
        meldElements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
      }
      elements.push(<div key={"meld-" + index} className={"tile-grouping meld " + tileOrMeld.type.toLowerCase()}>{meldElements}</div>);
    } else if (!isFlowerTile(tileOrMeld)) {
      const key = ("tile-input-index-" + index).toLowerCase();
      elements.push(<MahjongTile tile={tileOrMeld} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
    } // flower tiles are covered by convertFlowerTilesToReactElements.
  }
  // append any pending chow tiles at the end
  for (const [index, tile] of props.chowMeldModeTiles.entries()) {
    const key = ("tile-input-index-" + (props.tilesAndMelds.length + index)).toLowerCase();
    elements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
  }
  return elements;
}