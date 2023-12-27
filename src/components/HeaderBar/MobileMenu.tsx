import { SignedIn, UserButton } from '@clerk/nextjs'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { Popper } from '@mui/base/Popper'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import MenuList from '@mui/joy/MenuList'
import Stack from '@mui/joy/Stack'
import { styled } from '@mui/joy/styles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { ButtonCreate } from '../ButtonCreate'

const Popup = styled(Popper)({
  zIndex: 1000,
})

export default function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack direction={'row-reverse'} alignItems={'center'} spacing={1}>
      <SignedIn>
        <IconButton
          ref={buttonRef}
          id="composition-button"
          aria-controls={'composition-menu'}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="soft"
          color="secondary"
          onClick={() => {
            setOpen((prevOpen) => !prevOpen)
          }}
        >
          {open ? 'x' : '='}
        </IconButton>
        <Popup
          role={undefined}
          id="composition-menu"
          open={open}
          anchorEl={buttonRef.current}
          disablePortal
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ]}
          sx={{ pr: 2 }}
        >
          <ClickAwayListener
            onClickAway={(event) => {
              if (event.target !== buttonRef.current) {
                handleClose()
              }
            }}
          >
            <MenuList variant="outlined" sx={{ boxShadow: 'md', px: 1 }}>
              <Stack spacing={1} alignItems={'flex-end'}>
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <SignedIn>
                    {pathname !== '/reportar' ? (
                      <Link prefetch={false} href="/reportar" passHref>
                        <Button variant="soft" fullWidth>
                          Reportar
                        </Button>
                      </Link>
                    ) : null}
                  </SignedIn>
                  {pathname !== '/dashboard' ? <ButtonCreate /> : null}
                </Stack>
              </Stack>
            </MenuList>
          </ClickAwayListener>
        </Popup>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </Stack>
  )
}
