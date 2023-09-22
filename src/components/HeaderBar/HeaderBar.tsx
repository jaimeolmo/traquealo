import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Image from 'next/image'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Box from '@mui/joy/Box'

export function HeaderBar() {
  return (
    <Sheet
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1,
        bgcolor: '#1385BD',
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
        <Image
          src={'../images/traquealo_logo_.svg'}
          alt={'Logo for the traquealo brand.'}
          width="32"
          height="32"
          style={{ marginLeft: '8px' }}
        />
        <Image
          src={'../images/logo_text.svg'}
          alt={'Text for the traquealo brand.'}
          width="120"
          height="32"
        />
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="flex-end">
          <SignedOut>
            <Box
              sx={{
                '& a': {
                  color: '#fff',
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
