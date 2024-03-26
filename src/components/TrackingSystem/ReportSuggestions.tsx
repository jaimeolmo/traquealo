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
import Textarea from '@mui/joy/Textarea'
import Typography from '@mui/joy/Typography'
import { useState, useTransition } from 'react'

import Box from '@mui/joy/Box'
import 'react-datepicker/dist/react-datepicker.css'
import { SuggestCategoriesMenu } from '../CategoriesMenu/SuggestCategoriesMenu'
import { SuggestAbuse } from '../ReportDetails/SuggestAbuse'

type PayloadForSuggestion = {
  reportId: string
  userId: string
  type: ReportSuggestionType
  reportTitle: string
  categories: Array<string>
}
export default function ReportSuggestions({
  payload,
}: {
  payload: PayloadForSuggestion
}) {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState(payload.reportTitle)
  const [type, setType] = useState<ReportSuggestionType>(
    ReportSuggestionType.TitleChange,
  )
  const [error, setError] = useState(false)
  const { openSnackbar } = useSnackbar()

  const handleTitleChange = (e: {
    target: { name: string; value: string }
  }) => {
    const { value } = e.target
    setTitle(value)
  }

  const handleSuggestionSubmit = () => {
    console.log(title.length)
    if (title.length === 0) {
      setError(true)
      return
    }
    if (payload.reportTitle === title) {
      const message = {
        type: SnackbarMessageType.warning,
        content: `Al parecer al título es el mismo.`,
      }
      openSnackbar(message)
      return
    }

    startTransition(async () => {
      try {
        await createReportSuggestion({
          reportId: payload.reportId,
          userId: payload.userId,
          type: type,
          description: `El usuario ${payload.userId} ha recomendado actualizar el título de "${payload.reportTitle}" a "${title}"`,
        })
      } catch (e) {
        const message = {
          type: SnackbarMessageType.danger,
          content: 'Problemas enviando sugerencia. Favor trate más tarde.',
        }
        openSnackbar(message)
        return
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
        onClose={() => {
          setOpen(false)
          setTitle(payload.reportTitle)
          setError(false)
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 500,
            minWidth: 290,
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
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              sx={{ zIndex: 0 }}
              onChange={(event, value) => {
                if (value === 0) setType(ReportSuggestionType.TitleChange)
                if (value === 1) setType(ReportSuggestionType.CategoriesUpdate)
                if (value === 2) setType(ReportSuggestionType.Flagged)
              }}
            >
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
                <Stack spacing={1}>
                  <Typography level="title-lg">Título actual</Typography>
                  <Typography level="h3" textColor={'neutral.500'}>
                    {payload.reportTitle}
                  </Typography>
                  <Typography level="title-lg">Recomendación</Typography>
                  <Textarea
                    minRows={2}
                    value={title}
                    error={error}
                    variant="outlined"
                    size="lg"
                    onChange={handleTitleChange}
                    onFocus={() => {
                      setError(false)
                    }}
                    sx={{
                      fontWeight: 500,
                      fontSize: '1.5rem',
                      width: '100%',
                      color: 'primary.900',
                      '& textarea': {
                        lineHeight: '1.35',
                        letterSpacing: '-0.025em',
                      },
                    }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Button type="submit" onClick={handleSuggestionSubmit}>
                      Enviar
                    </Button>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={1}>
                <SuggestCategoriesMenu
                  reportId={payload.reportId}
                  reportCategories={payload.categories}
                  userId={payload.userId}
                  type={type}
                />
              </TabPanel>
              <TabPanel value={2}>
                <SuggestAbuse
                  reportId={payload.reportId}
                  userId={payload.userId}
                  type={type}
                />
              </TabPanel>
            </Tabs>
          </Stack>
        </Sheet>
      </Modal>
    </>
  )
}
