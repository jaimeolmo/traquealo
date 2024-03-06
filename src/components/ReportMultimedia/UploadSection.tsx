'use client'
import { UppyComponent } from '@/components/Uppy/Uppy'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import Transloadit from '@uppy/transloadit'
import Webcam from '@uppy/webcam'
import { useMemo, useState } from 'react'

type ComponentProps = {
  userId: string
  reportId: string
}

export default function UploadSection({ userId, reportId }: ComponentProps) {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)

  const uppy = useMemo(() => {
    const uppyInstance = new Uppy()
      .use(ImageEditor, {
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: false,
          zoomIn: false,
          zoomOut: false,
          cropSquare: false,
          cropWidescreen: false,
          cropWidescreenVertical: false,
        },
      })
      .use(Webcam, {
        showVideoSourceDropdown: true,
        showRecordingLength: true,
        videoConstraints: {
          facingMode: { ideal: 'environment' },
        },
      })
      .use(Transloadit, {
        assemblyOptions: {
          params: {
            auth: {
              key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY as string,
            },
            template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
          },
          fields: {
            userId: userId,
            issueId: reportId,
          },
        },
      })

    return uppyInstance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      onSubmit={async (event) => {
        setFormIsSubmitting(true)
        event.preventDefault()

        try {
          const uploadResult = await uppy.upload()

          if (uploadResult.failed.length > 0) {
            uploadResult.failed.forEach((file) => {
              console.error(file.error)
            })

            // Good place to notify user of errors during uploading
            return
          }
        } catch (error) {
          console.error('Error submitting form:', error)
        } finally {
          setFormIsSubmitting(false)
        }
      }}
    >
      <Stack spacing={2}>
        <Stack height={360}>
          <UppyComponent uppy={uppy} />
        </Stack>
        <Button loading={formIsSubmitting} type="submit" size="lg">
          Save
        </Button>
      </Stack>
    </form>
  )
}
