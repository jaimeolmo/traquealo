import Uppy from '@uppy/core'
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
      hideProgressAfterFinish
      waitForThumbnailsBeforeUpload
    />
  )
}
