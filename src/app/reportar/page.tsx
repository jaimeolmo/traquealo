'use client'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

export default function App() {
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <>
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
      />
      <button onClick={log}>Log editor content</button>
    </>
  )
}
