import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export function LandingSection() {
  return (
    <Sheet
      sx={{
        width: '100%',
        px: 2,
        pt: 4,
      }}
    >
      <Stack
        direction={'column'}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          maxWidth: '1024px',
          margin: 'auto',
          height: '100%',
        }}
      >
        <Typography level="h1">
          Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos
          Comunitarios
        </Typography>
      </Stack>
    </Sheet>
  )
}
