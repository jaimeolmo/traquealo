import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
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
          forma clara, rápida y eficiente. Mientras ensamblamos cada una de las
          piezas necesarias para esta plataforma te invitamos que te unas a
          nuestro Newsletter donde te mantendremos informados del progreso
          realizado.
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
              width: "100%",
              maxWidth: "600px",
              px: 2,
            }}
          >
            <iframe
              src="https://embeds.beehiiv.com/c4164416-2f49-4186-92be-1ea418315b8a?slim=true"
              data-test-id="beehiiv-embed"
              width="100%"
              height="52"
              frameBorder="0"
              scrolling="no"
              style={{
                margin: "auto",
                borderRadius: "0px !important",
                backgroundColor: "transparent",
              }}
            ></iframe>
          </Stack>
        </Stack>
      </Stack>
    </Sheet>
  );
}
