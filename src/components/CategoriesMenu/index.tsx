'use client'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import Dropdown from '@mui/joy/Dropdown'
import IconButton from '@mui/joy/IconButton'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import Stack from '@mui/joy/Stack'
import { MenuItems } from './MenuItems'
import { CategoriesProps } from './types'

export default function CategoriesMenu({
  reportId,
  reportCategories,
}: CategoriesProps) {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }}>
        <AddBoxRoundedIcon sx={{ color: 'primary.700' }} />
      </MenuButton>
      <Menu placement="bottom-end">
        <Stack sx={{ gap: 1 }}>
          <MenuItems reportId={reportId} reportCategories={reportCategories} />
        </Stack>
      </Menu>
    </Dropdown>
  )
}
