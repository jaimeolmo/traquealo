'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { deleteTimelineEvent } from '@/utilities/actions/deleteTimelineEvent'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import IconButton from '@mui/joy/IconButton'
import { useTransition } from 'react'

export default function DeleteEventButton({
  eventId,
}: {
  eventId: string | undefined
}) {
  const [pending, startTransition] = useTransition()
  const { openSnackbar } = useSnackbar()

  return (
    <IconButton
      size="sm"
      color="danger"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          try {
            await deleteTimelineEvent(eventId)
          } catch (e) {
            const message = {
              type: SnackbarMessageType.danger,
              content:
                'Problemas eliminando el reporte. Favor trate más tarde.',
            }
            openSnackbar(message)
            return
          }
        })
      }}
    >
      <RemoveCircleRoundedIcon />
    </IconButton>
  )
}
