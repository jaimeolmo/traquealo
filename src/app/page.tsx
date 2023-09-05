import Typography from "@mui/joy/Typography";
import { Footer } from "@/components/Footer/Footer";
import Sheet from "@mui/joy/Sheet";
import { MailingListSection } from "@/components/MailingListSection/MailingListSection";
import { HeaderBar } from "@/components/HeaderBar/HeaderBar";
import { StepsBar } from "@/components/StepsBar/StepsBar";
import { LinksSection } from "@/components/LinksSection/LinksSections";

export default function Home() {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <HeaderBar />
      <Typography level="h1">
        Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos
        Comunitarios.
      </Typography>
      <Typography>
        Estamos trabajando en crear una plataforma donde puedas reportar y
        monitorear problemas en tu comunidad. Problemas como la falta de energía
        eléctrica, estorbos públicos, daños a carreteras y pavimento, basureros
        clandestinos y más necesitan ser expuestos y resueltos de forma clara,
        rápida y eficiente. Mientras ensamblamos cada una de las piezas
        necesarias para esta plataforma te invitamos que te unas a nuestro
        Newsletter donde te mantendremos informados del progreso realizado.{" "}
      </Typography>
      <Typography level="h3">Déjanos saber tu dirección de email</Typography>
      <MailingListSection />
      <StepsBar />
      <LinksSection />
      <Footer />
    </Sheet>
  );
}
