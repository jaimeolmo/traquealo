import Typography from "@mui/joy/Typography";
import styles from "./page.module.css";
import { Footer } from "@/components/Footer/Footer";
import SectionList from "@/components/SectionList/SectionList";
import Stack from "@mui/joy/Stack";

export default function Home() {
  return (
    <main className={styles.main}>
      <Typography level="h2">Quick update to verify staging.</Typography>
      <Stack direction="row">
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
    </main>
  );
}
