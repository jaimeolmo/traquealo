'use client'
import { createTimelineEvent } from '@/utilities/actions/createTimelineEvent'
import { Payload } from '@/utilities/actions/payloadBuilder'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export default function UnsolvedButton({ payload, shouldBeDisable }: Payload) {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      disabled={shouldBeDisable || pending}
      type="submit"
      fullWidth
      startDecorator={<ThumbDownRoundedIcon />}
      onClick={() => {
        startTransition(async () => {
          try {
            await createTimelineEvent(payload)
          } catch (e) {
            alert('error')
          }
        })
      }}
      aria-label="reportar sin resolver"
      color="danger"
    >
      Reportar sin resolver
    </Button>
  )
}
