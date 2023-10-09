import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'

export default async function Contacts() {
  return (
    <>
      <HeaderBar />
      <Sheet>
        <Stack sx={{ p: 8 }}>
          <h1>Contáctenos</h1>
          <p>Listado de los diferentes canales de comunicación</p>
        </Stack>
      </Sheet>
    </>
  )
}
