import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export function MailingListSection() {
  return (
    <Sheet sx={{ maxWidth: "1024px", width: "100%" }}>
      <Stack spacing={2} sx={{ pt: 4, px: 2 }}>
        <Typography level="h2">Déjanos saber tu dirección de email</Typography>
        <Typography>
          Estamos trabajando en crear una plataforma donde puedas reportar y
          monitorear problemas en tu comunidad. Problemas como la falta de
          energía eléctrica, estorbos públicos, daños a carreteras y pavimento,
          basureros clandestinos y más necesitan ser expuestos y resueltos de
          forma clara, rápida y eficiente.
        </Typography>
        <Typography>
          Mientras ensamblamos cada una de las piezas necesarias para esta
          plataforma te invitamos que te unas a nuestro Newsletter donde te
          mantendremos informados del progreso realizado.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            pb: 4,
          }}
        >
          <Stack
            sx={{
              maxWidth: "600px",
            }}
          >
            <div className="ml-embedded" data-form="MCgcZF"></div>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
}
