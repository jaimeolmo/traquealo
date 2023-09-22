import { SignIn } from '@clerk/nextjs'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

type SearchParams = {
  redirectUrl?: string
}

export default async function Page() {
  return (
    <Sheet>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <SignIn />
      </Stack>
    </Sheet>
  )
}
