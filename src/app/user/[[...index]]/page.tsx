import { UserProfile } from '@clerk/nextjs'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

export default function Page() {
  return (
    <Sheet sx={{ p: 8 }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <UserProfile />
      </Stack>
    </Sheet>
  )
}
