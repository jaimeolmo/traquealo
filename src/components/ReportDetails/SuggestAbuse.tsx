'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { ReportSuggestionType } from '@/models/ReportSuggestion'
import { createReportSuggestion } from '@/utilities/actions/createReportSuggestion'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Textarea from '@mui/joy/Textarea'
import Typography from '@mui/joy/Typography'
import { useState, useTransition } from 'react'

type PayloadForSuggestion = {
  reportId: string
  userId: string
  type: ReportSuggestionType
}

export function SuggestAbuse({ reportId, userId, type }: PayloadForSuggestion) {
  const [pending, startTransition] = useTransition()
  const { openSnackbar } = useSnackbar()
  const [error, setError] = useState(false)
  const [reason, setReason] = useState('')

  const handleReason = (e: { target: { name: string; value: string } }) => {
    const { value } = e.target
    // Check if the length is greater than 140
    if (value.length > 140) {
      setError(true)
    } else {
      setError(false)
    }
    setReason(value)
  }

  const handleSuggestionSubmit = () => {
    if (reason.length === 0 || error) {
      setError(true)
      return
    }

    startTransition(async () => {
      try {
        await createReportSuggestion({
          reportId: reportId,
          userId: userId,
          type: type,
          description: `El usuario ${userId} ha recomendado marcar el reporte como abusivo, la razón: ${reason}`,
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
      return
    })
  }

  const remainingChars = 140 - reason.length

  return (
    <Stack>
      <Typography level="title-lg">
        Por favor, explique brevemente la razón por la cual desea reportar este
        evento.
      </Typography>
      <Typography>{` ${remainingChars} caracteres restantes.`}</Typography>
      <Box
        aria-labelledby="report-categories"
        sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
      >
        <Textarea
          minRows={2}
          error={error}
          variant="outlined"
          onChange={handleReason}
          onFocus={() => {
            setError(false)
          }}
          sx={{
            fontWeight: 500,

            width: '100%',
            color: 'primary.900',
            '& textarea': {
              letterSpacing: '-0.025em',
            },
          }}
        />
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          type="submit"
          loading={pending}
          disabled={pending}
          onClick={handleSuggestionSubmit}
        >
          Enviar
        </Button>
      </Box>
    </Stack>
  )
}
