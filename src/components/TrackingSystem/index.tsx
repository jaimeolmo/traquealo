import ReportStatusIndicator from '@/components/ReportStatusIndicator'
import { auth } from '@clerk/nextjs'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CategoryIcon from '@mui/icons-material/Category'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import CategoriesMenu from '../CategoriesMenu'
import CommunityButton from './CommunityButton'
import DeleteButton from './DeleteButton'
import { PayloadItems } from '@/utilities/actions/createTimelineEvent'

type ComponentProps = {
  createdOn: Date
  reportId: string
  reportSlug: string
  categories: Array<string>
  reportOwner: string
  userDisplayName: string
  userImageUrl: string | undefined
  communityButtonDisableState: boolean
}

export default function TrackingSideBar({
  createdOn,
  reportId,
  reportSlug,
  categories,
  reportOwner,
  userDisplayName,
  userImageUrl,
  communityButtonDisableState,
}: ComponentProps) {
  const { userId } = auth()

  return (
    <Box>
      <Stack spacing={1}>
        <ReportStatusIndicator createdOn={createdOn} />
        {/* TODO: This will be implemented during Season 2.
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={<Groups3Icon sx={{ color: 'secondary.600' }} />}
            sx={{ flex: 1 }}
            textColor={'primary.700'}
          >
            Responsables
          </Typography>
          <Box>
            <IconButton variant="plain">
              <AddBoxRoundedIcon sx={{ color: 'primary.700' }} />
            </IconButton>
          </Box>
          <AgenciesMenu />
        </Stack> 
        <Stack direction="row" spacing={2}>
          Familia
        </Stack>
        */}
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={<CategoryIcon sx={{ color: 'secondary.600' }} />}
            sx={{ flex: 1 }}
            textColor={'primary.700'}
          >
            Categorías
          </Typography>

          {reportOwner === userId ? (
            <CategoriesMenu reportId={reportId} reportCategories={categories} />
          ) : null}
        </Stack>
        {categories !== null && !Array.isArray(categories) && (
          <Stack
            spacing={1}
            direction={'row'}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography
                startDecorator={
                  <ErrorOutlineRoundedIcon sx={{ color: 'neutral.500' }} />
                }
                sx={{ flex: 1 }}
                textColor={'neutral.500'}
              >
                Aún sin categorías
              </Typography>
            </Box>
          </Stack>
        )}
        {Array.isArray(categories) && categories.length === 0 && (
          <Stack
            spacing={1}
            direction={'row'}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography
                startDecorator={
                  <ErrorOutlineRoundedIcon sx={{ color: 'neutral.500' }} />
                }
                sx={{ flex: 1 }}
                textColor={'neutral.500'}
              >
                Aún sin categorías
              </Typography>
            </Box>
          </Stack>
        )}
        {Array.isArray(categories) && (
          <Box
            sx={{
              display: 'inline',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {categories.map((item) => (
              <Chip key={item} sx={{ m: '4px' }} size="lg">
                {item}
              </Chip>
            ))}
          </Box>
        )}
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={
              <FactCheckRoundedIcon sx={{ color: 'secondary.600' }} />
            }
            sx={{ flex: 1 }}
            textColor={'primary.700'}
          >
            Traquealo
          </Typography>
        </Stack>

        <Stack>
          <Button
            startDecorator={<ThumbUpRoundedIcon />}
            aria-label="resuelto"
            color="success"
          >
            Reportar resuelto
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<ThumbDownRoundedIcon />}
            aria-label="resuelto"
            color="danger"
          >
            Reportar sin resolver
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<EngineeringRoundedIcon />}
            aria-label="resuelto"
            color="secondary"
          >
            Reportar progreso
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<CalendarMonthRoundedIcon />}
            aria-label="resuelto"
            color="neutral"
            variant="soft"
          >
            ¿Inicio del problema?
          </Button>
        </Stack>
        <Stack>
          <CommunityButton
            payload={payloadBuilder(
              reportId,
              userId as string,
              reportSlug,
              userDisplayName,
              userImageUrl,
            )}
            shouldBeDisable={communityButtonDisableState}
          />
        </Stack>
        <Stack>
          <Button
            startDecorator={<FeedbackIcon />}
            aria-label="flag this report"
            color="neutral"
            variant="plain"
          >
            Sugerir Cambios
          </Button>
        </Stack>
        {reportOwner === userId ? (
          <Stack>
            <DeleteButton reportId={reportId} />
          </Stack>
        ) : null}
      </Stack>
    </Box>
  )
}

function payloadBuilder(
  reportId: string,
  userId: string,
  reportSlug: string,
  userDisplayName: string,
  userImageUrl: string | undefined,
): PayloadItems {
  return {
    reportId: reportId,
    reportSlug: reportSlug,
    userId: userId as string,
    userDisplayName: userDisplayName,
    userImageUrl: userImageUrl,
    type: 'CommunityImpact',
    description: `${userDisplayName} ha indicado que este evento impacta su comunidad.`,
  }
}
