'use client'
import CheckIcon from '@mui/icons-material/Check'
import MoreVert from '@mui/icons-material/MoreVert'
import Box from '@mui/joy/Box'
import Checkbox from '@mui/joy/Checkbox'
import Chip from '@mui/joy/Chip'
import Dropdown from '@mui/joy/Dropdown'
import IconButton from '@mui/joy/IconButton'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import Stack from '@mui/joy/Stack'
import * as React from 'react'

export default function CategoriesMenu() {
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { color: 'neutral' } }}
        sx={{ borderRadius: 40 }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <Stack sx={{ gap: 1 }}>
          <Box
            aria-labelledby="fav-movie"
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
              const checked = selected.includes(name)
              return (
                <Chip
                  key={name}
                  variant="plain"
                  color={checked ? 'primary' : 'neutral'}
                  startDecorator={
                    checked && (
                      <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                    )
                  }
                >
                  <Checkbox
                    variant="outlined"
                    color={checked ? 'primary' : 'neutral'}
                    disableIcon
                    overlay
                    label={name}
                    checked={checked}
                    onChange={(event) => {
                      setSelected((names) =>
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
        </Stack>
      </Menu>
    </Dropdown>
  )
}
