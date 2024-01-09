'use client'
import { createTimelineEvent } from '@/utilities/actions/createTimelineEvent'
import { Payload } from '@/utilities/actions/payloadBuilder'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export default function SolvedButton({ payload, shouldBeDisable }: Payload) {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      disabled={shouldBeDisable || pending}
      type="submit"
      fullWidth
      startDecorator={<ThumbUpRoundedIcon />}
      onClick={() => {
        startTransition(async () => {
          try {
            await createTimelineEvent(payload)
          } catch (e) {
            alert('error')
          }
        })
      }}
      aria-label="reportar resuelto"
      color="success"
    >
      Reportar resuelto
    </Button>
  )
}
