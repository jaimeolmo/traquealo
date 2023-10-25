import Uppy from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { Dashboard } from '@uppy/react'

type ComponentProps = {
  uppy: Uppy
}

export function UppyComponent({ uppy }: ComponentProps) {
  return (
    <Dashboard
      uppy={uppy}
      plugins={['Webcam']}
      width="100%"
      waitForThumbnailsBeforeUpload
      hideUploadButton
    />
  )
}
