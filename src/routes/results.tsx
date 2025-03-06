import { createFileRoute } from '@tanstack/react-router'
import ResultsDisplay from '../components/resultsDisplay/ResultsDisplay'

export const Route = createFileRoute('/results')({
  component: ResultsDisplay,
  loader: ({context}) => context,
})