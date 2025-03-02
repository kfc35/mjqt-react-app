import './App.css'
import MahjongKeyboard from './keyboard/MahjongKeyboard'
import Footer from './Footer'
import { Route } from './routes/index';
import type { CalculatorContext } from './main';

function App() {
  const routerContext: CalculatorContext = Route.useLoaderData();

  return (
    <>
      <h1>Mahjong Scoring Calculator</h1>
      <div className="card">
        <MahjongKeyboard rootConfig={routerContext.rootPointPredicateConfig}/>
      </div>
      <Footer />
    </>
  )
}

export default App
