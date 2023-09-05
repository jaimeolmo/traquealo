import Typography from "@mui/joy/Typography";
import { Footer } from "@/components/Footer/Footer";
import Sheet from "@mui/joy/Sheet";
import { MailingListSection } from "@/components/MailingListSection/MailingListSection";
import { HeaderBar } from "@/components/HeaderBar/HeaderBar";
import { StepsBar } from "@/components/StepsBar/StepsBar";
import { LinksSection } from "@/components/LinksSection/LinksSections";
import { LandingSection } from "@/components/LandingSection/LandingSection";

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
      <LandingSection />
      <MailingListSection />
      <StepsBar />
      <LinksSection />
      <Footer />
    </Sheet>
  );
}
