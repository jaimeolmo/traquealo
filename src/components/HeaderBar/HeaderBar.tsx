import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Image from "next/image";

export function HeaderBar() {
  return (
    <Sheet
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 1,
        bgcolor: "#1385BD",
        pl: 2,
        pt: 1,
        height: 80,
      }}
    >
      <Stack direction={"row"} sx={{ maxWidth: "1024px", margin: "auto" }}>
        <Image
          src={"../images/traquealo_logo_.svg"}
          alt={"Logo for the traquealo brand."}
          width="60"
          height="60"
        />
        <Image
          src={"../images/logo_text.svg"}
          alt={"Text for the traquealo brand."}
          width="180"
          height="60"
        />
      </Stack>
    </Sheet>
  );
}
