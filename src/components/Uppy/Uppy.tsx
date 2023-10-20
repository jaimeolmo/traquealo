import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'

type ComponentProps = {
  uppy: Uppy
}

export function UppyComponent({ uppy }: ComponentProps) {
  uppy.on('file-added', (file) => {
    console.log('Added file', file)
  })

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
