import { Tile, Meld } from 'mjqt-scoring'
import MahjongTile from '../mahjongTile/MahjongTile';
import { ReactElement } from "react";

interface TileInputBarProps {
  tilesAndMelds: (Tile | Meld)[]
  createOnTileClickSplice: (index: number) => () => void;
}

function PlaceholderTile(): ReactElement {

  return (
    <> 
      <span className="mahjong-tile">&#x1f02b;</span>
    </>
  )
}

function TileInputBar(props : TileInputBarProps) {
  const elements = convertTilesAndMeldsToReactElements(props);
  if (elements.length < 14) {
    for (const i of Array.from({length: 14 - elements.length}, (_, k) => k + elements.length)) {
      const key = "placeholder-tile-" + i;
      elements.push(<PlaceholderTile key={key} />);
    }
  }

  return (
    <>
      <div>
        {elements}
      </div>
    </>
  )
}
  
export default TileInputBar
  
function convertTilesAndMeldsToReactElements(props: TileInputBarProps): ReactElement[] {
  const elements : ReactElement[] = [];
  for (const [index, tileOrMeld] of props.tilesAndMelds.entries()) {
    if (tileOrMeld instanceof Tile) {
      const key = ("tile-input-index-" + index).toLowerCase();
      elements.push(<MahjongTile tile={tileOrMeld} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
    } else {
      for (const tile of tileOrMeld.tiles) {
        const key = ("tile-input-index-" + index).toLowerCase();
        elements.push(<MahjongTile tile={tile} key={key} onTileClick={props.createOnTileClickSplice(index)}/>);
      }
    }
  }
  return elements;
}