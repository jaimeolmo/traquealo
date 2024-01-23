'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { ReportEditableRootProperty } from '@/models/Issue'
import { editReportRootData } from '@/utilities/actions/editReportRootData'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import Box from '@mui/joy/Box'
import CircularProgress from '@mui/joy/CircularProgress'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Textarea from '@mui/joy/Textarea'
import Typography from '@mui/joy/Typography'
import { SetStateAction, useState, useTransition } from 'react'

type ComponentProps = {
  reportId: string
  currentTitle: string
  currentUserId: string
  reportOwnerId: string
  userDisplayName: string
  userImageUrl: string | undefined
}

export default function EditableTitle({
  reportId,
  currentTitle,
  currentUserId,
  reportOwnerId,
  userDisplayName,
  userImageUrl,
}: ComponentProps) {
  const [pending, startTransition] = useTransition()
  const [title, setTitle] = useState(currentTitle)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)
  const { openSnackbar } = useSnackbar()

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    if (title.length === 0) {
      setError(true)
      return
    }
    if (title === currentTitle) {
      setIsEditing(false)
      return
    }
    startTransition(async () => {
      try {
        await editReportRootData({
          newValue: title,
          originalValue: currentTitle,
          reportId: reportId,
          currentUserId: currentUserId,
          userDisplayName: userDisplayName,
          userImageUrl: userImageUrl,
          editableProperty: ReportEditableRootProperty.title,
        })
      } catch (e: any) {
        const message = {
          type: SnackbarMessageType.danger,
          content: 'Problemas actualizando el reporte. Favor trate más tarde.',
        }
        openSnackbar(message)
        return
      } finally {
        setIsEditing(false)
      }
    })
  }

  const handleTitleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setTitle(event.target.value)
  }

  const handleClickAway = () => {
    setIsEditing(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack direction="row" spacing={2} alignItems={'center'}>
        {isEditing ? (
          <Textarea
            minRows={2}
            value={title}
            error={error}
            variant="outlined"
            size="lg"
            onChange={handleTitleChange}
            onFocus={() => {
              setError(false)
            }}
            sx={{
              fontWeight: 700,
              lineHeight: '1.33334',
              fontSize: '1.875rem',
              width: '100%',
              color: 'primary.900',
              '& textarea': {
                lineHeight: '1.33334',
                letterSpacing: '-0.025em',
              },
            }}
          />
        ) : (
          <Typography level="h2" textColor={'primary.900'}>
            {title}
          </Typography>
        )}
        {currentUserId === reportOwnerId
          ? renderActionButtons(
              isEditing,
              pending,
              handleEditClick,
              handleSaveClick,
            )
          : null}
      </Stack>
    </ClickAwayListener>
  )
}

function renderActionButtons(
  isEditing: boolean,
  loading: boolean,
  handleEditClick: () => void,
  handleSaveClick: () => void,
) {
  if (isEditing) {
    return (
      <Box>
        <IconButton variant="soft" onClick={handleSaveClick}>
          {loading ? <CircularProgress /> : <SaveRoundedIcon />}
        </IconButton>
      </Box>
    )
  }

  return (
    <Box>
      <IconButton variant="soft" onClick={handleEditClick}>
        <EditRoundedIcon />
      </IconButton>
    </Box>
  )
}
