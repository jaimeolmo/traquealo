'use client'
import Box from '@mui/joy/Box'
import Skeleton from '@mui/joy/Skeleton'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

type ComponentProps = {
  initialValue: string
}

export function RichTextComponent({ initialValue }: ComponentProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const [loading, setLoading] = useState(true)

  return (
    <Box
      sx={{
        position: 'relative',
        height: 360,
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            height: 'inherit',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Skeleton variant="text" width={'96%'} />
          <Skeleton variant="text" width={'100%'} />
          <Skeleton variant="text" width={'98%'} />
        </Box>
      ) : null}

      <Editor
        tinymceScriptSrc={`${process.env.NEXT_PUBLIC_URL}/scripts/tinymce/tinymce.min.js`}
        onInit={(evt, editor) => {
          editorRef.current = editor
          setLoading(false)
        }}
        disabled
        init={{
          resize: false,
          branding: false,
          elementpath: false,
          height: 360,
          width: '100%',
          menubar: false,
          toolbar: false,
          readonly: true,
          statusbar: false,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        initialValue={initialValue}
        onSubmit={() => {}}
      />
    </Box>
  )
}
