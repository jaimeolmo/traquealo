'use client'
import { SnackbarMessageType, useSnackbar } from '@/app/store/ui/SnackbarContext'
import { createTimelineEvent } from '@/utilities/actions/createTimelineEvent'
import { Payload } from '@/utilities/actions/payloadBuilder'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import Button from '@mui/joy/Button'
import { useTransition } from 'react'

export default function ProgressUpdateButton({
  payload,
  shouldBeDisable,
}: Payload) {
  const [pending, startTransition] = useTransition()
  const { openSnackbar } = useSnackbar()

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
          } catch (e: any) {
            const message = {
              type: SnackbarMessageType.danger,
              content: 'No se pudo actualizar el reporte.',
            }
            openSnackbar(message)
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
