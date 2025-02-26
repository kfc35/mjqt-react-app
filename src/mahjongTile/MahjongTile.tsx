//import { useState } from 'react'
import './MahjongTile.css'
import { Tile } from 'mjqt-scoring'
import mahjongTileToUnicodeMap from './mahjongTileUnicodeMap'

interface MahjongTileProps {
  tile: Tile;
}

function MahjongTile(props: MahjongTileProps) {

  return (
    <>
      <button className="mahjong-tile-button">
        {mahjongTileToUnicodeMap.get(props.tile)}
      </button>
    </>
  )
}

export default MahjongTile