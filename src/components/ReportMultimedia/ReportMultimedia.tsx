import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Tab from '@mui/joy/Tab'
import TabList from '@mui/joy/TabList'
import TabPanel from '@mui/joy/TabPanel'
import Tabs from '@mui/joy/Tabs'
import { ImageGroup } from './ImageGroup'
import UploadSection from './UploadSection'

type ComponentProps = {
  userId: string
  reportId: string
  media: [] | never[]
  sasToken: string
}

export default function ReportMultimedia({
  userId,
  reportId,
  sasToken,
  media,
}: ComponentProps) {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ zIndex: 0 }}>
      <TabList disableUnderline>
        <Tab>
          <ListItemDecorator>
            <ImageRoundedIcon />
          </ListItemDecorator>
          Galería
        </Tab>
        <Tab>
          <ListItemDecorator>
            <AddAPhotoRoundedIcon />
          </ListItemDecorator>
          Añadir más...
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <ImageGroup media={media} sasToken={sasToken} />
      </TabPanel>
      <TabPanel value={1}>
        <UploadSection reportId={reportId} userId={userId} />
      </TabPanel>
    </Tabs>
  )
}
