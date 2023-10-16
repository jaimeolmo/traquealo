import Uppy from '@uppy/core'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import { Dashboard } from '@uppy/react'
import Transloadit from '@uppy/transloadit'
import Webcam from '@uppy/webcam'

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/webcam/dist/style.min.css'

// Don’t forget to keep the Uppy instance outside of your component.
const uppy = new Uppy().use(Webcam).use(Transloadit, {
  assemblyOptions: {
    params: {
      auth: { key: 'd9dd878a03ef4c139564c92f66ce017e' },
      template_id: '20f86a8910634331b9155c76e4b16e99',
    },
  },
})

export function UppyComponent() {
  return <Dashboard uppy={uppy} plugins={['Webcam']} width="100%" />
}
