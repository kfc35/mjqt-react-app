//import { useState } from 'react'
import { ONE_BAMBOO } from 'mjqt-scoring'

function MahjongTile() {

  return (
    <>
      <div>
        
      </div>
      <h1>Mahjong Tile</h1>
      <div className="tile">
        <button>
          tile is {ONE_BAMBOO.group} + {ONE_BAMBOO.value} 
        </button>
      </div>
      <p>
        Ugh
      </p>
    </>
  )
}

export default MahjongTile