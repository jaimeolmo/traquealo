'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ButtonCreate } from '../ButtonCreate'
import { Logo } from '../Logo'

export function HeaderBar() {
  const pathname = usePathname()

  return (
    <Sheet
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1,
        bgcolor: 'var(--joy-palette-primary-500)',
        height: 80,
        px: 2,
        alignItem: 'center',
      }}
    >
      <Stack
        direction={'row'}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          maxWidth: '1024px',
          margin: 'auto',
          height: '100%',
        }}
      >
        {pathname === '/' ? (
          <Logo />
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
        <Stack
          spacing={2}
          sx={{ width: '100%' }}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <SignedIn>
            {pathname !== '/reportar' ? (
              <Link href="/reportar" passHref>
                <Button variant="soft">Reportar</Button>
              </Link>
            ) : null}
          </SignedIn>
          {pathname !== '/dashboard' ? <ButtonCreate /> : null}
          <SignedOut>
            <Box
              sx={{
                '& a': {
                  color: 'var(--joy-palette-common-white)',
                },
              }}
            >
              <Link href="/sign-in">Sign in</Link>
            </Box>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </Stack>
      </Stack>
    </Sheet>
  )
}
