import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import { UrlObject } from 'url'
import styles from '../../app/styles.module.css'

type SectionListProps = {
  sectionTitle: string
  sectionList: Array<{
    sectionTitle: string
    sectionUrl: string
  }>
  arialLabelDescription: string
}

export function SectionList({
  sectionTitle,
  sectionList,
  arialLabelDescription,
}: SectionListProps) {
  return (
    <Stack sx={{ width: { xs: '50%', sm: '100%' } }}>
      <Typography textTransform="uppercase" level="title-md">
        {sectionTitle}
      </Typography>
      <List aria-labelledby="aria-label-description">
        {sectionList.map((item) => (
          <ListItem key={item.sectionTitle} sx={{ pl: 0 }}>
            <Link
              aria-label={arialLabelDescription}
              className={styles.linkItem}
              href={item.sectionUrl as unknown as UrlObject}
              passHref
            >
              {item.sectionTitle}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
