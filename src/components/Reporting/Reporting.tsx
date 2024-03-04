'use client'
import municipalities from '@/utilities/municipalities.json'
import Autocomplete, { AutocompleteChangeReason } from '@mui/joy/Autocomplete'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Skeleton from '@mui/joy/Skeleton'
import Stack from '@mui/joy/Stack'
import { Editor } from '@tinymce/tinymce-react'
import Uppy from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/dashboard/dist/style.min.css'
import ImageEditor from '@uppy/image-editor'
import '@uppy/image-editor/dist/style.min.css'
import { Dashboard } from '@uppy/react'
import Transloadit from '@uppy/transloadit'
import Webcam from '@uppy/webcam'
import '@uppy/webcam/dist/style.min.css'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { v4 as uuid } from 'uuid'

export default function Reporting({
  userId,
  shouldBeDisable,
}: {
  userId: string | null
  shouldBeDisable: boolean
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    municipality: '',
    municipalityId: '',
    municipalitySlug: '',
    userId: userId,
    issueId: uuid(),
  })
  const [uppy, setUppyInstance] = useState<unknown>(null)
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
            userId: userId as string,
            issueId: formData['issueId'],
          },
        },
      })

    setUppyInstance(uppyInstance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editorRef = useRef<TinyMCEEditor | null>(null)

  const handleSubmit = () => {
    if (editorRef.current) {
      setFormData({ ...formData, ['content']: editorRef.current.getContent() })
    }
  }

  const handleTitleChange = (e: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleMunicipalityChange = (
    event: SyntheticEvent<Element, Event>,
    value: {
      id: string
      name: string
      slug: string
    } | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (value) {
      setFormData({
        ...formData,
        ['municipalityId']: value.id,
        ['municipality']: value.name,
        ['municipalitySlug']: value.slug,
      })
    }

    if (reason === 'clear') setFormData({ ...formData, ['municipality']: '' })
  }

  if (userId === null) return <>Unable to create report</>

  return (
    <form
      onSubmit={async (event) => {
        setFormIsSubmitting(true)
        event.preventDefault()

        try {
          const uploadResult = await (uppy as Uppy).upload()

          if (uploadResult.failed.length > 0) {
            uploadResult.failed.forEach((file) => {
              console.error(file.error)
            })

            // Good place to notify user of errors during uploading
            return
          }

          const response = await fetch(
            process.env.NEXT_PUBLIC_ISSUE_API_URL as string,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            },
          )

          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status} ${response.statusText}`,
            )
          }

          router.push('/dashboard')
        } catch (error) {
          console.error('Error submitting form:', error)
        } finally {
          setFormIsSubmitting(false)
        }
      }}
    >
      <Stack spacing={2}>
        <Stack>
          <FormControl id="add-title">
            <FormLabel>Añadir un título</FormLabel>
            <Input
              disabled={shouldBeDisable}
              placeholder="Título"
              name="title"
              required
              onChange={handleTitleChange}
            />
          </FormControl>
        </Stack>
        <Stack>
          <FormControl id="select-municipality">
            <FormLabel>Municipio impactado</FormLabel>
            <Autocomplete
              disabled={shouldBeDisable}
              placeholder="Municipio"
              name="municipality"
              options={municipalities}
              required
              autoSelect
              getOptionLabel={(option) => option.name}
              autoHighlight
              onChange={handleMunicipalityChange}
            />
          </FormControl>
        </Stack>
        <Stack>
          <FormControl id="add-description">
            <FormLabel>Añadir una descripción</FormLabel>

            <Box sx={{ height: 360, position: 'relative' }}>
              {loading ? (
                <Box
                  sx={{
                    position: 'absolute',
                    height: 'inherit',
                    width: '100%',
                    backgroundColor: 'white',
                    p: 2,
                  }}
                >
                  <Skeleton variant="text" width={'96%'} />
                  <Skeleton variant="text" width={'100%'} />
                  <Skeleton variant="text" width={'98%'} />
                </Box>
              ) : null}

              <Editor
                id="reportar"
                disabled={shouldBeDisable}
                tinymceScriptSrc={`${process.env.NEXT_PUBLIC_URL}/scripts/tinymce/tinymce.min.js`}
                onInit={(evt, editor) => {
                  editorRef.current = editor
                  setLoading(false)
                }}
                init={{
                  branding: false,
                  elementpath: false,
                  height: 360,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'anchor',
                    'wordcount',
                  ],
                  toolbar:
                    'bold italic forecolor | ' +
                    'bullist numlist outdent indent | removeformat ',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onSubmit={handleSubmit}
              />
            </Box>
          </FormControl>
        </Stack>
        <Stack height={360}>
          {uppy ? (
            <Dashboard
              disabled={shouldBeDisable}
              uppy={uppy as Uppy}
              plugins={['Webcam', 'ImageEditor']}
              width="100%"
              height={360}
              proudlyDisplayPoweredByUppy={false}
              waitForThumbnailsBeforeUpload
              hideUploadButton
            />
          ) : null}
        </Stack>
        <Button
          disabled={shouldBeDisable}
          loading={formIsSubmitting}
          type="submit"
          size="lg"
        >
          Save
        </Button>
      </Stack>
    </form>
  )
}
