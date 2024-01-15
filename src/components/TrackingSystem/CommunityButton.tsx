'use client'
import { createTimelineEvent } from '@/utilities/actions/createTimelineEvent'
import { Payload } from '@/utilities/actions/payloadBuilder'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export default function CommunityButton({ payload, shouldBeDisable }: Payload) {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      disabled={shouldBeDisable || pending}
      type="submit"
      fullWidth
      startDecorator={<Groups2RoundedIcon />}
      onClick={() => {
        startTransition(async () => {
          try {
            await createTimelineEvent(payload)
          } catch (e) {
            alert('error')
          }
        })
      }}
      aria-label="¿impacta mi comunidad?"
      variant="soft"
    >
      ¿Impacta mi comunidad?
    </Button>
  )
}
