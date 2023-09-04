import Typography from "@mui/joy/Typography";
import { Footer } from "@/components/Footer/Footer";
import { SectionList } from "@/components/SectionList/SectionList";
import Stack from "@mui/joy/Stack";
import { SimpleCard } from "@/components/SimpleCard/SimpleCard";
import Sheet from "@mui/joy/Sheet";
import { MailinglistSection } from "@/components/MailinglistSection/MailinglistSection";

export default function Home() {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        p: 6,
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography level="h1">
        Monitoreo de incidentes y mejoras en tu comunidad.{" "}
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
      <MailinglistSection />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <SimpleCard
          cardTitle={"Obsérvalo"}
          cardContent={
            "Identifica en tu área posibles problemas que afectan la comunidad."
          }
          arialLabelDescription={""}
        />
        <SimpleCard
          cardTitle={"Repórtalo"}
          cardContent={
            "A través de nuestras cuentas sociales o accede a nuestro sistema para actualizar detalles del evento."
          }
          arialLabelDescription={""}
        />
        <SimpleCard
          cardTitle={"Traquéalo"}
          cardContent={
            "Acá nos encargaremos de consolidar todos los reportes de tu comunidad. Identificaremos responsables y monitorearemos el evento hasta que pueda ser resuelto."
          }
          arialLabelDescription={""}
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }}>
        <SectionList
          sectionTitle="Links"
          sectionList={[
            {
              sectionTitle: "FAQ",
              sectionUrl: "#",
            },
            { sectionTitle: "Help", sectionUrl: "#" },
            { sectionTitle: "Support", sectionUrl: "#" },
          ]}
          arialLabelDescription={"Links for the different support sections."}
        />
        <SectionList
          sectionTitle="Legal"
          sectionList={[
            {
              sectionTitle: "Terms",
              sectionUrl: "#",
            },
            { sectionTitle: "Privacy", sectionUrl: "#" },
          ]}
          arialLabelDescription={"Links for legals information."}
        />
        <SectionList
          sectionTitle="Social"
          sectionList={[
            {
              sectionTitle: "Facebook",
              sectionUrl: "#",
            },
            { sectionTitle: "Instagram", sectionUrl: "#" },
            { sectionTitle: "X", sectionUrl: "#" },
          ]}
          arialLabelDescription={
            "Links for the different social media outlets."
          }
        />
        <SectionList
          sectionTitle="Traquealo"
          sectionList={[
            {
              sectionTitle: "About us",
              sectionUrl: "#",
            },
            { sectionTitle: "Contact", sectionUrl: "#" },
          ]}
          arialLabelDescription={
            "Links for getting more information about this web."
          }
        />
      </Stack>
      <Footer />
    </Sheet>
  );
}
