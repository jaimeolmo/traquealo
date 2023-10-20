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
import { useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { v4 as uuid } from 'uuid'

const newUuid = uuid()

export default function Reportar() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const userIdFromClerk = userId

  const editorRef = useRef<TinyMCEEditor | null>(null)
  const log = () => {
    if (editorRef.current) {
      setFormData({ ...formData, ['content']: editorRef.current.getContent() })
    }
  }
  const uppy = new Uppy().use(Webcam).use(Transloadit, {
    assemblyOptions: {
      params: {
        auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY as string },
        template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
      },
      fields: {
        userId: userIdFromClerk as string,
        issueId: newUuid,
      },
    },
  })

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
          console.log(formData)
          try {
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
                `API request failed with status ${response.status}`,
              )
            }

            const responseData = await response.json()
            console.log(responseData)

            // Handle successful submission e.g. navigate to another page or show success message
          } catch (error) {
            console.error('Error submitting form:', error)
            // Handle errors e.g. show an error message to the user
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
              onSubmit={log}
            />
          </Stack>
          <Stack>
            <UppyComponent uppy={uppy} />
          </Stack>
          <Button type="submit">Save</Button>
        </Stack>
      </form>
      IssueId: {newUuid}
      <br />
      UserId: {userIdFromClerk}
    </Sheet>
  )
}
