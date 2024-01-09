import ReportStatusIndicator from '@/components/ReportStatusIndicator'
import { ReportEventType } from '@/models/ReportEvent'
import { payloadBuilder } from '@/utilities/actions/payloadBuilder'
import { auth } from '@clerk/nextjs'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CategoryIcon from '@mui/icons-material/Category'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import FeedbackIcon from '@mui/icons-material/Feedback'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Chip from '@mui/joy/Chip'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import CategoriesMenu from '../CategoriesMenu'
import CommunityButton from './CommunityButton'
import DeleteButton from './DeleteButton'
import ProgressUpdateButton from './ProgressUpdateButton'
import SolvedButton from './SolvedButton'
import UnsolvedButton from './UnsolvedButton'

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
          <SolvedButton
            payload={payloadBuilder(
              reportId,
              userId as string,
              reportSlug,
              userDisplayName,
              userImageUrl,
              ReportEventType.Solved,
              `Según ${userDisplayName}, este evento puede ser considerado como resuelto.`,
            )}
            shouldBeDisable={false}
          />
        </Stack>
        <Stack>
          <UnsolvedButton
            payload={payloadBuilder(
              reportId,
              userId as string,
              reportSlug,
              userDisplayName,
              userImageUrl,
              ReportEventType.Unsolved,
              `Según ${userDisplayName}, este evento aún continua sin ser atendido.`,
            )}
            shouldBeDisable={false}
          />
        </Stack>
        <Stack>
          <ProgressUpdateButton
            payload={payloadBuilder(
              reportId,
              userId as string,
              reportSlug,
              userDisplayName,
              userImageUrl,
              ReportEventType.ProgressUpdate,
              `Según ${userDisplayName}, este evento ha mostrado progreso favorable.`,
            )}
            shouldBeDisable={false}
          />
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
              ReportEventType.CommunityImpact,
              `${userDisplayName} ha indicado que este evento impacta su comunidad.`,
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
