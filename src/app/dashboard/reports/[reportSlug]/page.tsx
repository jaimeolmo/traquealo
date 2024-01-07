import ReportOwnerAndDateCreated from '@/components/ReportDetails'
import { RichTextComponent } from '@/components/RichText'
import ReportEventsTimeline from '@/components/Timeline/ReportEventsTimeline'
import TrackingSideBar from '@/components/TrackingSystem'
import { Issue } from '@/models/Issue'
import { getUserDetails } from '@/utilities/actions/getUserDetails'
import ReportCosmosClient from '@/utilities/cosmosdb/ReportCosmosClient'
import ReportEventCosmosClient from '@/utilities/cosmosdb/ReportEventCosmosClient'
import { auth } from '@clerk/nextjs'
import PlaceIcon from '@mui/icons-material/Place'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

async function getAllReportEvents(reportSlug: string) {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    const reportEventCosmosClient = new ReportEventCosmosClient()
    const response = await reportEventCosmosClient.getByPropertyValue(
      'reportSlug',
      reportSlug,
    )

    return response || null
  } catch (error) {
    return null
  }
}

async function getAuthenticatedUserId() {
  const { userId } = auth()

  return userId
}

export default async function ReportDetails({
  params,
}: {
  params: { reportSlug: string }
}) {
  const report = await getReportBySlug(params.reportSlug)
  const timelineEvents = await getAllReportEvents(params.reportSlug)

  const currentUserId = await getAuthenticatedUserId()

  const communityButtonShouldBeDisable = timelineEvents?.some(
    (item) => item.userId === currentUserId && item.type === 'CommunityImpact',
  )

  if (!report) return notFound()

  const userDetails = await getUserDetails(currentUserId)
  const reportCategories: string[] =
    report[0].categories &&
    Object.entries(report[0].categories)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4, py: 2 }}>
      <Stack spacing={1}>
        <Typography level="h2" textColor={'primary.900'}>
          {report[0].title}
        </Typography>
        <Typography startDecorator={<PlaceIcon />}>
          <Link
            href={`/dashboard/municipalities/${report[0].municipalitySlug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Municipio de {report[0].municipality}
          </Link>
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
              <Sheet
                variant="outlined"
                color="neutral"
                sx={{ p: 4, borderRadius: 8 }}
              >
                {timelineEvents && (
                  <ReportEventsTimeline
                    events={timelineEvents}
                    currentUserId={currentUserId}
                  />
                )}
              </Sheet>
            </Stack>
          </Grid>
          <Grid sm={4} xs={12}>
            <TrackingSideBar
              createdOn={new Date(report[0].createdOn)}
              reportId={report[0].id}
              reportSlug={report[0].reportSlug}
              categories={reportCategories}
              reportOwner={report[0].userId}
              userDisplayName={userDetails?.displayName ?? 'No disponible'}
              userImageUrl={userDetails?.urlImage}
              communityButtonDisableState={
                communityButtonShouldBeDisable ?? false
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </Sheet>
  )
}
