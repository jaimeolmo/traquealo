'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { ReportEditableRootProperty } from '@/models/Issue'
import { editReportRootData } from '@/utilities/actions/editReportRootData'
import { Button, Stack } from '@mui/joy'
import Box from '@mui/joy/Box'
import Skeleton from '@mui/joy/Skeleton'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState, useTransition } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

type ComponentProps = {
  initialValue: string
  isReportOwner: boolean
  reportId: string
  currentUserId: string
  userDisplayName: string
  userImageUrl: string
}

export function RichTextComponent({
  initialValue,
  isReportOwner,
  reportId,
  currentUserId,
  userDisplayName,
  userImageUrl,
}: ComponentProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const { openSnackbar } = useSnackbar()

  const handleSaveClick = () => {
    if (!editorRef.current) return

    if (editorRef.current.getContent() === initialValue) {
      return
    }

    startTransition(async () => {
      try {
        await editReportRootData({
          newValue: editorRef?.current?.getContent() ?? '',
          originalValue: initialValue,
          reportId: reportId,
          currentUserId: currentUserId,
          userDisplayName: userDisplayName,
          userImageUrl: userImageUrl,
          editableProperty: ReportEditableRootProperty.content,
        })
      } catch (e: any) {
        const message = {
          type: SnackbarMessageType.danger,
          content: e.message,
        }
        openSnackbar(message)
      }
    })
  }

  return (
    <>
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
              p: 2,
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
          disabled={!isReportOwner || pending}
          init={{
            resize: false,
            branding: false,
            elementpath: false,
            height: 360,
            width: '100%',
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
          initialValue={initialValue}
        />
      </Box>
      {isReportOwner ? (
        <Stack
          direction={'row'}
          justifyContent={'end'}
          spacing={1}
          sx={{ p: 1 }}
        >
          <Button loading={pending} type="submit" onClick={handleSaveClick}>
            Save
          </Button>
        </Stack>
      ) : null}
    </>
  )
}
