import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

export default async function AboutUs() {
  return (
    <>
      <HeaderBar />
      <Sheet>
        <Stack sx={{ p: 8 }}>
          <h1>Misión y Visión</h1>
        </Stack>
      </Sheet>
    </>
  )
}
