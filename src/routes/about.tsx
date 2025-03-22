import { createFileRoute } from '@tanstack/react-router'
import AboutContent from '../components/about/AboutContent'

export const Route = createFileRoute('/about')({
  component: AboutContent
})