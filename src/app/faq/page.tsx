import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

export default async function Faq() {
  return (
    <>
      <HeaderBar />
      <Sheet>
        <Stack sx={{ p: 8 }}>
          <h1>FAQ</h1>
          <p>Welcome to the FAQ page!</p>
        </Stack>
      </Sheet>
    </>
  )
}
