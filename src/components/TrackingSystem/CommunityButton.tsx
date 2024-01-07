'use client'
import {
  PayloadItems,
  createTimelineEvent,
} from '@/utilities/actions/createTimelineEvent'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export type Payload = {
  payload: PayloadItems
  shouldBeDisable: boolean
}

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
      aria-label="resuelto"
      color="neutral"
      variant="soft"
    >
      ¿Impacta mi comunidad?
    </Button>
  )
}
