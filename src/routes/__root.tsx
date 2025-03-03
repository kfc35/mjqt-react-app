import { CalculatorContext } from '../main';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRouteWithContext<CalculatorContext>()({
  component: () => {
    return (
    <>
      <div id="nav">
        <Link to="/" className="[&.active]:font-bold" >
          Home
        </Link>{' | '}
        <Link to="/config" className="[&.active]:font-bold">
          Scoring Configuration
        </Link>{' | '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <hr />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )},
})