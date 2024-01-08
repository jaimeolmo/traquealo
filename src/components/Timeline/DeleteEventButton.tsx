'use client'
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

  return (
    <IconButton
      size="sm"
      color="danger"
      onClick={() => {
        startTransition(async () => {
          try {
            await deleteTimelineEvent(eventId)
          } catch (e) {
            alert('error')
          }
        })
      }}
    >
      <RemoveCircleRoundedIcon />
    </IconButton>
  )
}
