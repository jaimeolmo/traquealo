import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export function MailingListSection() {
  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%' }}>
      <Stack spacing={2} sx={{ pt: 4, px: 2 }}>
        <Typography>
          Estamos trabajando en crear una plataforma donde puedas reportar y
          monitorear problemas en tu comunidad. Problemas como la falta de
          energía eléctrica, estorbos públicos, daños a carreteras y pavimento,
          basureros clandestinos y más necesitan ser expuestos y resueltos de
          forma clara, rápida y eficiente.
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            pb: 4,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              maxWidth: '600px',
            }}
          >
            <Typography level="h2">
              Déjanos saber tu dirección de email
            </Typography>
            <Button
              color="secondary"
              size="lg"
              component="a"
              href="https://dashboard.mailerlite.com/forms/589222/98767971802941294/share"
            >
              Únete a nuestro newsletter
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  )
}
