'use client'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
        id="HeaderContainer"
        direction={'row'}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          maxWidth: '1024px',
          margin: 'auto',
          height: '100%',
        }}
      >
        <Stack id="LogoArea" alignItems="flex-start" sx={{ width: '50%' }}>
          {pathname === '/' ? (
            <Logo />
          ) : (
            <Link prefetch={false} href="/">
              <Logo />
            </Link>
          )}
        </Stack>
        <Stack
          id="MobileNavigationArea"
          justifyContent="flex-end"
          textAlign={'right'}
          sx={{
            width: '50%',
            display: { xs: 'block', sm: 'none' },
          }}
        >
          {/* <SignInButton />
          <Box>
            <MobileMenu />
          </Box> */}
        </Stack>
        <Stack
          id="DesktopNavigationArea"
          spacing={2}
          sx={{
            width: '50%',
            display: { xs: 'none', sm: 'flex' },
          }}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <SignedIn>
            {pathname !== '/reportar' ? (
              <Link prefetch={false} href="/reportar" passHref>
                <Button variant="soft">Reportar</Button>
              </Link>
            ) : null}
            {pathname !== '/dashboard' ? (
              <Link prefetch={false} href="/dashboard" passHref>
                <Button variant="soft" color="secondary">
                  Dashboard
                </Button>
              </Link>
            ) : null}
            {pathname !== '/dashboard/municipalities' ? (
              <Link prefetch={false} href="/dashboard/municipalities" passHref>
                <Button variant="soft" color="secondary">
                  Municipios
                </Button>
              </Link>
            ) : null}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignInButton /> */}
        </Stack>
      </Stack>
    </Sheet>
  )
}
