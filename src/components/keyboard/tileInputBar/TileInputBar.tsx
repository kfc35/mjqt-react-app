import { Tile, Meld, isFlowerTile } from 'mjqt-scoring'
import MahjongTile from '../mahjongTile/MahjongTile';
import { ReactElement } from "react";

interface TileInputBarProps {
  tilesAndMelds: (Tile | Meld)[]
  createOnTileClickSplice: (index: number) => () => void;
}

function TileInputBar(props : TileInputBarProps) {
  const elements = convertNonFlowerTilesAndMeldsToReactElements(props);
  if (elements.length < 14) {
    for (const i of Array.from({length: 14 - elements.length}, (_, k) => k + elements.length)) {
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
        {elements}
      </div>
      <div>
        <h2>Inputted Flower Tiles</h2>
        {flowerElements.length === 0 ? <p>None</p>: flowerElements}
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
      for (const [secondIndex, tile] of tileOrMeld.tiles.entries()) {
        const key = ("tile-input-index-" + index + "-" + secondIndex).toLowerCase();
        elements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
      }
      
    } else if (!isFlowerTile(tileOrMeld)) {
      const key = ("tile-input-index-" + index).toLowerCase();
      elements.push(<MahjongTile tile={tileOrMeld} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
    } // flower tiles are covered by convertFlowerTilesToReactElements.
  }
  return elements;
}