import Uppy from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'
import { Dashboard } from '@uppy/react'
import '@uppy/webcam/dist/style.min.css'

type ComponentProps = {
  uppy: Uppy
}

export function UppyComponent({ uppy }: ComponentProps) {
  return (
    <Dashboard
      uppy={uppy}
      plugins={['Webcam', 'ImageEditor']}
      width="100%"
      height={360}
      proudlyDisplayPoweredByUppy={false}
      waitForThumbnailsBeforeUpload
      hideUploadButton
    />
  )
}
