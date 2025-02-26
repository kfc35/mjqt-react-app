//import { useState } from 'react'
import './MahjongTile.css'
import { Tile, EAST_WIND, SOUTH_WIND, WEST_WIND, NORTH_WIND,
  RED_DRAGON, GREEN_DRAGON, WHITE_DRAGON } from 'mjqt-scoring'

  const tileToMap: Map<Tile, string> = new Map();
  /* https://unicode.org/charts/nameslist/n_1F000.html */
  tileToMap.set(EAST_WIND, "\uD83C\uDC00"); // = "\u1F000"
  tileToMap.set(SOUTH_WIND, "\uD83C\uDC01");
  tileToMap.set(WEST_WIND, "\uD83C\uDC02");
  tileToMap.set(NORTH_WIND, "\uD83C\uDC03");
  tileToMap.set(RED_DRAGON, "\uD83C\uDC04\uFE0E");
  tileToMap.set(GREEN_DRAGON, "\uD83C\uDC05");
  tileToMap.set(WHITE_DRAGON, "\uD83C\uDC06");

function MahjongTile() {

  return (
    <>
      <div>
        <h1>{tileToMap.get(EAST_WIND)} {tileToMap.get(SOUTH_WIND)} {tileToMap.get(WEST_WIND)} {tileToMap.get(NORTH_WIND)}</h1>
        <h1>{tileToMap.get(RED_DRAGON)} {tileToMap.get(GREEN_DRAGON)} {tileToMap.get(WHITE_DRAGON)}</h1>
      </div>
      <h1>Mahjong Tile</h1>
      <div >
        <button className="mahjong-tile-button">
          {tileToMap.get(EAST_WIND)}
        </button>
      </div>
    </>
  )
}

export default MahjongTile