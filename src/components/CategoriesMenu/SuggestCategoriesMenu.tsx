'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import { ReportSuggestionType } from '@/models/ReportSuggestion'
import { createReportSuggestion } from '@/utilities/actions/createReportSuggestion'
import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Checkbox from '@mui/joy/Checkbox'
import Chip from '@mui/joy/Chip'
import Stack from '@mui/joy/Stack'
import { useState, useTransition } from 'react'
import { Categories } from './types'

type PayloadForSuggestion = {
  reportId: string
  userId: string
  type: ReportSuggestionType
  reportCategories: Array<string>
}

export function SuggestCategoriesMenu({
  reportId,
  reportCategories,
  userId,
  type,
}: PayloadForSuggestion) {
  const [pending, startTransition] = useTransition()
  const { openSnackbar } = useSnackbar()
  const [selected] = useState<Array<string>>(reportCategories || [])
  const [suggest, setSuggest] = useState<Array<string>>([])

  const handleSuggestionSubmit = () => {
    if (suggest.length === 0) {
      return
    }

    startTransition(async () => {
      try {
        const flatString = suggest.join(', ')

        await createReportSuggestion({
          reportId: reportId,
          userId: userId,
          type: type,
          description: `El usuario ${userId} ha recomendado añadir las siguientes categorías: ${flatString}`,
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

  return (
    <Stack>
      <Box
        aria-labelledby="report-categories"
        sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
      >
        {Categories.map((name) => {
          const checked = selected?.includes(name)
          const newCategory = suggest?.includes(name)
          return (
            <Chip
              key={name}
              disabled={checked}
              variant="plain"
              color={newCategory ? 'primary' : 'neutral'}
              startDecorator={
                (newCategory || checked) && (
                  <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                )
              }
            >
              <Checkbox
                variant="outlined"
                color={newCategory ? 'primary' : 'neutral'}
                disableIcon
                overlay
                label={name}
                checked={newCategory}
                onChange={async (event) => {
                  setSuggest((names) =>
                    !event.target.checked
                      ? names.filter((n) => n !== name)
                      : [...names, name],
                  )
                }}
              />
            </Chip>
          )
        })}
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
