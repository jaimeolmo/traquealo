'use client'
import { UppyComponent } from '@/components/Uppy/Uppy'
import { useAuth } from '@clerk/nextjs'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { Editor } from '@tinymce/tinymce-react'
import Uppy from '@uppy/core'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import Transloadit from '@uppy/transloadit'
import Webcam from '@uppy/webcam'
import '@uppy/webcam/dist/style.min.css'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { v4 as uuid } from 'uuid'

export default function IssueReportPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, userId } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userId: userId as string,
    issueId: uuid(),
  })
  // useEffect(() => {
  //   setFormData({ ...formData, ['issueId']: uuid() })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const uppy = useMemo(() => {
    const uppyInstance = new Uppy().use(Webcam).use(Transloadit, {
      assemblyOptions: {
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY as string },
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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', py: 8, px: 4 }}>
      <form
        onSubmit={async (event) => {
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
          }
        }}
      >
        <Stack spacing={2}>
          <Stack>
            <Input
              placeholder="Título"
              name="title"
              required
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Editor
              tinymceScriptSrc={
                process.env.NEXT_PUBLIC_URL + '/scripts/tinymce/tinymce.min.js'
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                branding: false,
                elementpath: false,
                height: 500,
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
          </Stack>
          <Stack>
            <UppyComponent uppy={uppy} />
          </Stack>
          <Button type="submit">Save</Button>
        </Stack>
      </form>
      IssueId: {formData['issueId']}
      <br />
      UserId: {userId}
    </Sheet>
  )
}
