//import { useState } from 'react'
import './MahjongTile.css'
import { Tile, GREEN_TILES, REVERSIBLE_TILES, SIMPLE_TILES, TERMINAL_TILES } from 'mjqt-scoring'
import mahjongTileToUnicodeMap from './mahjongTileUnicodeMap'

const greenTilesSet: Set<Tile> = new Set(GREEN_TILES);
const reversibleTilesSet: Set<Tile> = new Set(REVERSIBLE_TILES);
const simpleTilesSet: Set<Tile> = new Set(SIMPLE_TILES);
const terminalTilesSet: Set<Tile> = new Set(TERMINAL_TILES);

interface MahjongTileProps {
  tile: Tile;
}

function MahjongTile(props: MahjongTileProps) {
  const id = (props.tile.group + "-" + props.tile.value).toLowerCase();
  const classNames: string[] = [];
  classNames.push("mahjong-tile-button");
  if (simpleTilesSet.has(props.tile)) {
    classNames.push("simple-tile");
  }
  if (terminalTilesSet.has(props.tile)) {
    classNames.push("terminal-tile");
  }
  if (greenTilesSet.has(props.tile)) {
    classNames.push("green-tile");
  }
  if (reversibleTilesSet.has(props.tile)) {
    classNames.push("reversible-tile");
  }
  return (
    <>
      <button className={classNames.join(" ")} id ={id} >
        {mahjongTileToUnicodeMap.get(props.tile)}
      </button>
    </>
  )
}

export default MahjongTile