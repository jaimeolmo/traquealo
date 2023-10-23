import { SignUp } from '@clerk/nextjs'
import Stack from '@mui/joy/Stack'

export default async function Page() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
    >
      <SignUp />
    </Stack>
  )
}
