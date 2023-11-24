'use client'
import { UppyComponent } from '@/components/Uppy/Uppy'
import municipalities from '@/utilities/municipalities.json'
import { useAuth } from '@clerk/nextjs'
import Autocomplete, { AutocompleteChangeReason } from '@mui/joy/Autocomplete'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { Editor } from '@tinymce/tinymce-react'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import Transloadit from '@uppy/transloadit'
import Webcam from '@uppy/webcam'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useMemo, useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { v4 as uuid } from 'uuid'

export default function IssueReportPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, userId } = useAuth()
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    municipality: '',
    municipalityId: '',
    userId: userId as string,
    issueId: uuid(),
  })

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
            userId: userId as string,
            issueId: formData['issueId'],
          },
        },
      })

    return uppyInstance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editorRef = useRef<TinyMCEEditor | null>(null)
  const handleSubmit = () => {
    if (editorRef.current) {
      setFormData({ ...formData, ['content']: editorRef.current.getContent() })
    }
  }

  const handleTitleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleMunicipalityChange = (
    event: SyntheticEvent<Element, Event>,
    value: {
      id: string
      name: string
    } | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (value) {
      setFormData({
        ...formData,
        ['municipalityId']: value.id,
        ['municipality']: value.name,
      })
    }

    if (reason === 'clear') setFormData({ ...formData, ['municipality']: '' })
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', py: 8, px: 4 }}>
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
              <Editor
                tinymceScriptSrc={`${process.env.NEXT_PUBLIC_URL}/scripts/tinymce/tinymce.min.js`}
                onInit={(evt, editor) => (editorRef.current = editor)}
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
            </FormControl>
          </Stack>
          <Stack height={360}>
            <UppyComponent uppy={uppy} />
          </Stack>
          <Button loading={formIsSubmitting} type="submit" size="lg">
            Save
          </Button>
        </Stack>
      </form>
    </Sheet>
  )
}
