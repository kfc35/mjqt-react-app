//import { useState } from 'react'
import './MahjongTile.css'
import { Tile } from 'mjqt-scoring'
import mahjongTileToUnicodeMap from './mahjongTileUnicodeMap'

interface MahjongTileProps {
  tile: Tile;
}

function MahjongTile(props: MahjongTileProps) {
  const id = props.tile.group + "-" + props.tile.value;

  return (
    <>
      <button className="mahjong-tile-button" id={id}>
        {mahjongTileToUnicodeMap.get(props.tile)}
      </button>
    </>
  )
}

export default MahjongTile