import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  loader: ({context}) => context
})

function About() {
  const context = Route.useLoaderData();

  return <div>Hello from About! Max Points: {context.rootPointPredicateConfig.maxPoints}</div>
}