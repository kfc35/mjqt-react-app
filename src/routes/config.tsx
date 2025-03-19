import { createFileRoute } from '@tanstack/react-router'
import ConfigurationEditor from '../components/configEditor/ConfigurationEditor'

export const Route = createFileRoute('/config')({
  component: ConfigurationEditor,
  loader: ({context}) => context,
})
