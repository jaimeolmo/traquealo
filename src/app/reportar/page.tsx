'use client'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'

export default function Reportar() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      setFormData({ ...formData, ['content']: editorRef.current.getContent() })
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <Sheet sx={{ p: 8 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          console.log(formData)
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
              initialValue="<p>This is the initial content of the editor.</p>"
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
          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Sheet>
  )
}
