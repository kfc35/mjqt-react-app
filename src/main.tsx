import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { defaultRootPointPredicateConfiguration, type PointEvaluation, type RootPointPredicateConfiguration } from 'mjqt-scoring'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

export interface CalculatorContext {
  rootPointPredicateConfig: RootPointPredicateConfiguration
  mostRecentPointEvaluations: PointEvaluation[]
}

const initContext = { 
  rootPointPredicateConfig: defaultRootPointPredicateConfiguration.clone(),
  mostRecentPointEvaluations: []
};

// deployment to github pages requires this basepath
const basePath = '/mjqt-react-app/';

// Create a new router instance
const router = createRouter({ routeTree, context: initContext, basepath: basePath })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}