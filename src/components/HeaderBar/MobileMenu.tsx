import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Dropdown from '@mui/joy/Dropdown'
import IconButton from '@mui/joy/IconButton'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import Stack from '@mui/joy/Stack'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { UrlObject } from 'url'
import { ButtonCreate } from '../ButtonCreate'

export default function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleOpenChange = useCallback(
    (event: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen)
    },
    [],
  )

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dropdown open={open} onOpenChange={handleOpenChange}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'soft', color: 'secondary' } }}
      >
        {open ? <CloseRoundedIcon /> : <DragHandleRoundedIcon />}
      </MenuButton>

      <Menu placement="bottom-end" sx={{ px: 1 }}>
        <Stack spacing={1} alignItems={'flex-end'}>
          <Stack sx={{ width: '100%' }}>
            <SignedIn>
              {pathname !== '/reportar' ? (
                <Link prefetch={false} href="/reportar" passHref>
                  <Button variant="soft" fullWidth>
                    Reportar
                  </Button>
                </Link>
              ) : null}
            </SignedIn>
          </Stack>
          <Stack>
            {pathname !== '/dashboard' ? <ButtonCreate /> : null}
            <SignedOut>
              <Box
                sx={{
                  '& a': {
                    color: 'var(--joy-palette-common-white)',
                  },
                }}
              >
                <Link
                  prefetch={false}
                  href={'/sign-in' as unknown as UrlObject}
                >
                  Sign in
                </Link>
              </Box>
            </SignedOut>
          </Stack>
          <Stack>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </Stack>
        </Stack>
      </Menu>
    </Dropdown>
  )
}
