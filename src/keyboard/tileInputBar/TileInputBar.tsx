import { Tile, Meld } from 'mjqt-scoring'
import MahjongTile from '../mahjongTile/MahjongTile';
import { ReactElement } from "react";

interface TileInputBarProps {
  tilesAndMelds: (Tile | Meld)[]
}

function TileInputBar(props : TileInputBarProps) {
  const elements = convertTilesAndMeldsToReactElements(props.tilesAndMelds);
  if (elements.length === 0) {
    return (
      <> 
        <div className="mahjong-tile">
          &#x1f02b;
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        {convertTilesAndMeldsToReactElements(props.tilesAndMelds)}
      </div>
    </>
  )
}
  
export default TileInputBar
  
function convertTilesAndMeldsToReactElements(tilesAndMelds: (Tile | Meld)[]): ReactElement[] {
  const elements : ReactElement[] = [];
  for (const [index, tileOrMeld] of tilesAndMelds.entries()) {
    if (tileOrMeld instanceof Tile) {
      const key = ("tile-input-index-" + index).toLowerCase();
      elements.push(<MahjongTile tile={tileOrMeld} key={key} />);
    } else {
      for (const tile of tileOrMeld.tiles) {
        const key = ("tile-input-index-" + index).toLowerCase();
        elements.push(<MahjongTile tile={tile} key={key} />);
      }
    }
  }
  return elements;
}