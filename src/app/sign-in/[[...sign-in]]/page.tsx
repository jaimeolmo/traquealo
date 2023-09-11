import { SignIn } from "@clerk/nextjs";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";

type SearchParams = {
  redirectUrl?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const redirectUrl = searchParams?.redirectUrl || "/";

  return (
    <Sheet>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <SignIn redirectUrl={redirectUrl} />
      </Stack>
    </Sheet>
  );
}
