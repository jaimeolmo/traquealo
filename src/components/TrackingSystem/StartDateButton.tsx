'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { createTimelineEvent } from '@/utilities/actions/createTimelineEvent'
import { Payload } from '@/utilities/actions/payloadBuilder'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState, useTransition } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export default function StartDateButton({ payload, shouldBeDisable }: Payload) {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState<boolean>(false)
  const [startDate, setStartDate] = useState(new Date())
  const { openSnackbar } = useSnackbar()

  return (
    <>
      <Button
        disabled={shouldBeDisable || pending}
        type="submit"
        fullWidth
        startDecorator={<CalendarMonthRoundedIcon />}
        onClick={() => setOpen(true)}
        aria-label="¿Inicio del problema?"
        variant="soft"
      >
        ¿Cuándo inició el evento?
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Stack spacing={2}>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              ¿Cuándo inició el evento?
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              Favor escoger el mes que más cercano este al origen del evento. El
              propósito es tener un estimado de cuando comenzó a impactar la
              comunidad. No tiene que ser exacto.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                locale={es}
                maxDate={new Date()}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                inline
              />
            </Box>
            <Button
              disabled={shouldBeDisable || pending}
              type="submit"
              onClick={() => {
                payload.description = `Según ${
                  payload.userDisplayName
                }, este evento lleva impactando la comunidad aproximadamente desde ${format(
                  new Date(startDate),
                  "MMMM 'de' yyyy",
                  {
                    locale: es,
                  },
                )}.`
                startTransition(async () => {
                  try {
                    await createTimelineEvent(payload)
                  } catch (e) {
                    const message = {
                      type: SnackbarMessageType.danger,
                      content: `No se pudo actuliazar`,
                    }
                    openSnackbar(message)
                    return
                  } finally {
                    setOpen(false)
                  }
                })
              }}
            >
              Save
            </Button>
          </Stack>
        </Sheet>
      </Modal>
    </>
  )
}
