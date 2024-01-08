'use client'
import {
  PayloadItems,
  createTimelineEvent,
} from '@/utilities/actions/createTimelineEvent'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export type Payload = {
  payload: PayloadItems
  shouldBeDisable: boolean
}

export default function ProgressUpdateButton({
  payload,
  shouldBeDisable,
}: Payload) {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      disabled={shouldBeDisable || pending}
      type="submit"
      fullWidth
      startDecorator={<EngineeringRoundedIcon />}
      onClick={() => {
        startTransition(async () => {
          try {
            await createTimelineEvent(payload)
          } catch (e) {
            alert('error')
          }
        })
      }}
      aria-label="reportar progreso"
      color="secondary"
    >
      Reportar progreso
    </Button>
  )
}
