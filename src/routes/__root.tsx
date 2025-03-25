import { CalculatorContext } from '../main';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRouteWithContext<CalculatorContext>()({
  component: () => {
    return (
    <>
      <div id="nav">
        <Link to="/" className="[&.active]:font-bold" >
          Calculator
        </Link>{' | '}
        <Link to="/results" className="[&.active]:font-bold">
          Results
        </Link>{' | '}
        <Link to="/config" className="[&.active]:font-bold">
          Configuration
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
  notFoundComponent: () => {
    return <></>;
  },
  pendingComponent: () => {
    return <><p>Loading...</p></>;
  },
})