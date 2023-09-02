import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";

type SectionListProps = {
  sectionTitle: string;
  sectionList: Array<{
    sectionTitle: string;
    sectionUrl: string;
  }>;
  arialLabelDescription: string;
};

export default function SectionList({
  sectionTitle,
  sectionList,
  arialLabelDescription,
}: SectionListProps) {
  return (
    <Stack>
      <Typography textTransform="uppercase" level="title-md">
        {sectionTitle}
      </Typography>
      <List aria-labelledby="aria-label-description">
        {sectionList.map((item) => (
          <ListItem key={item.sectionTitle}>{item.sectionTitle}</ListItem>
        ))}
      </List>
    </Stack>
  );
}
