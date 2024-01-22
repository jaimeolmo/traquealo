'use client'
import { updateReportCategory } from '@/utilities/actions/updateReportCategory'
import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'
import Chip from '@mui/joy/Chip'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CategoriesProps } from './types'

export function MenuItems({ reportId, reportCategories }: CategoriesProps) {
  const [selected, setSelected] = useState<string[]>(reportCategories || [])
  const reportSlug = usePathname().split('/').pop()

  return (
    <Box
      aria-labelledby="report-categories"
      sx={{ width: 290, p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
    >
      {[
        'vivienda',
        'recursos naturales',
        'salud',
        'transportación',
        'cultura',
        'energía',
        'agua',
        'edificio público',
        'ornato',
        'infraestructura',
        'estorbo público',
        'rotulación',
      ].map((name) => {
        const checked = selected?.includes(name)
        return (
          <Chip
            key={name}
            variant="plain"
            color={checked ? 'primary' : 'neutral'}
            startDecorator={
              checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
            }
          >
            <Checkbox
              variant="outlined"
              color={checked ? 'primary' : 'neutral'}
              disableIcon
              overlay
              label={name}
              checked={checked}
              onChange={async (event) => {
                setSelected((names) =>
                  !event.target.checked
                    ? names.filter((n) => n !== name)
                    : [...names, name],
                )
                await updateReportCategory(
                  event.target.checked,
                  name,
                  reportId,
                  reportSlug,
                )
              }}
            />
          </Chip>
        )
      })}
    </Box>
  )
}
