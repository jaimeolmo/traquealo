import ReportOwnerAndDateCreated from '@/components/ReportDetails'
import { RichTextComponent } from '@/components/RichText'
import TrackingSideBar from '@/components/TrackingSystem'
import { Issue } from '@/models/Issue'
import ReportCosmosClient from '@/utilities/cosmosdb/ReportCosmosClient'
import { auth } from '@clerk/nextjs'
import PlaceIcon from '@mui/icons-material/Place'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { notFound } from 'next/navigation'

type Report = {
  id: string
  reportSlug: string
}

async function getReportBySlug(reportSlug: string): Promise<Issue[] | null> {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const reportCosmosClient = new ReportCosmosClient()
  const report = await reportCosmosClient.getByPropertyValue(
    'reportSlug',
    reportSlug,
  )

  return report || null
}

export default async function ReportDetails({
  params,
}: {
  params: { reportSlug: string }
}) {
  const report = await getReportBySlug(params.reportSlug)

  if (!report) return notFound()

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4, py: 2 }}>
      <Stack spacing={1}>
        <Typography level="h2">{report[0].title}</Typography>
        <Typography startDecorator={<PlaceIcon />}>
          Municipio de {report[0].municipality}
        </Typography>

        <Grid container spacing={2}>
          <Grid sm={8} xs={12}>
            <Stack spacing={2}>
              <Stack sx={{ width: '100%' }}>
                <RichTextComponent initialValue={report[0].content} />
              </Stack>
              <Stack>
                <ReportOwnerAndDateCreated
                  createdOn={new Date(report[0].createdOn)}
                  userId={report[0].userId}
                />
              </Stack>
              <Sheet
                variant="outlined"
                color="neutral"
                sx={{ p: 4, borderRadius: 8 }}
              >
                Fotos and videos
              </Sheet>
            </Stack>
          </Grid>
          <Grid sm={4} xs={12}>
            <TrackingSideBar
              createdOn={new Date(report[0].createdOn)}
              reportSlug={params.reportSlug}
            />
          </Grid>
        </Grid>
      </Stack>
    </Sheet>
  )
}
