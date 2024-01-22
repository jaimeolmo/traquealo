'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { ReportSuggestionType } from '@/models/ReportSuggestion'
import { createReportSuggestion } from '@/utilities/actions/createReportSuggestion'
import CategoryIcon from '@mui/icons-material/Category'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import Button from '@mui/joy/Button'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Tab from '@mui/joy/Tab'
import TabList from '@mui/joy/TabList'
import TabPanel from '@mui/joy/TabPanel'
import Tabs from '@mui/joy/Tabs'
import Typography from '@mui/joy/Typography'
import { useState, useTransition } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

type PayloadForSuggestion = {
  reportId: string
  userId: string
  type: ReportSuggestionType
  reportTitle: string
}
export default function ReportSuggestions({
  payload,
}: {
  payload: PayloadForSuggestion
}) {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState<boolean>(false)
  const { openSnackbar } = useSnackbar()

  const handleSuggestionSubmit = () => {
    startTransition(async () => {
      try {
        await createReportSuggestion({
          reportId: payload.reportId,
          userId: payload.userId,
          type: payload.type,
          description: '',
        })
      } catch (e: any) {
        const message = {
          type: SnackbarMessageType.danger,
          content: e.message,
        }
        openSnackbar(message)
      }
      const message = {
        type: SnackbarMessageType.success,
        content: `Sugerencia recibida exitosamente.`,
      }
      openSnackbar(message)
    })
  }

  return (
    <>
      <Button
        disabled={pending}
        type="submit"
        fullWidth
        startDecorator={<FeedbackIcon />}
        onClick={() => setOpen(true)}
        aria-label="sugerir cambios"
        color="neutral"
        variant="plain"
      >
        Sugerir Cambios
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
              Sugerir Cambios
            </Typography>
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ zIndex: 0 }}>
              <TabList disableUnderline>
                <Tab>
                  <ListItemDecorator>
                    <ListAltRoundedIcon />
                  </ListItemDecorator>
                  Titulo
                </Tab>
                <Tab>
                  <ListItemDecorator>
                    <CategoryIcon />
                  </ListItemDecorator>
                  Categorías
                </Tab>
                <Tab>
                  <ListItemDecorator>
                    <WarningRoundedIcon />
                  </ListItemDecorator>
                  Flag
                </Tab>
              </TabList>
              <TabPanel value={0}>
                Mejorar Título {payload.reportTitle}
                <Button type="submit" onClick={handleSuggestionSubmit}>
                  Enviar
                </Button>
              </TabPanel>
              <TabPanel value={1}>Añadir categorías</TabPanel>
              <TabPanel value={2}>Reportar como abuso</TabPanel>
            </Tabs>
          </Stack>
        </Sheet>
      </Modal>
    </>
  )
}
