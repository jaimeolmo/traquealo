import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export function LandingSection() {
  return (
    <Sheet
      sx={{
        width: "100%",
        px: 2,
      }}
    >
      <Stack
        direction={"column"}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          maxWidth: "1024px",
          margin: "auto",
          height: "100%",
        }}
      >
        <Typography level="h1">
          Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos
          Comunitarios.
        </Typography>
        <Typography>
          Estamos trabajando en crear una plataforma donde puedas reportar y
          monitorear problemas en tu comunidad. Problemas como la falta de
          energía eléctrica, estorbos públicos, daños a carreteras y pavimento,
          basureros clandestinos y más necesitan ser expuestos y resueltos de
          forma clara, rápida y eficiente. Mientras ensamblamos cada una de las
          piezas necesarias para esta plataforma te invitamos que te unas a
          nuestro Newsletter donde te mantendremos informados del progreso
          realizado.{" "}
        </Typography>
      </Stack>
    </Sheet>
  );
}
