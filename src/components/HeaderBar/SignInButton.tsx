import { SignedOut } from '@clerk/nextjs'
import LoginIcon from '@mui/icons-material/Login'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Link from 'next/link'
import { UrlObject } from 'url'

export default function SignInButton() {
  return (
    <SignedOut>
      <Box
        sx={{
          '& a': {
            color: 'var(--joy-palette-common-white)',
          },
        }}
      >
        <Link prefetch={false} href={'/sign-in' as unknown as UrlObject}>
          <Button variant="soft" color="secondary" endDecorator={<LoginIcon />}>
            Acceder
          </Button>
        </Link>
      </Box>
    </SignedOut>
  )
}
