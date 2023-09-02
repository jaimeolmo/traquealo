import { Inter } from "next/font/google";
import { Redacted_Script } from "next/font/google";
import { extendTheme } from "@mui/joy/styles";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            backgroundColor: "#4338ca",
          }),
        }),
      },
    },
  },
});

export default theme;
