import { useState } from 'react'
import './App.css'
import MahjongKeyboard from './keyboard/MahjongKeyboard'
import Footer from './Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Mahjong Scoring Calculator</h1>
      <div className="card">
        <MahjongKeyboard />
      </div>
      <Footer />
    </>
  )
}

export default App
