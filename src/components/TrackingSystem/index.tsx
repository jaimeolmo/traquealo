import ReportStatusIndicator from '@/components/ReportStatusIndicator'
import { ReportEventType } from '@/models/ReportEvent'
import { payloadBuilder } from '@/utilities/actions/payloadBuilder'
import { auth } from '@clerk/nextjs'
import CategoryIcon from '@mui/icons-material/Category'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import CategoriesMenu from '../CategoriesMenu'
import CommunityButton from './CommunityButton'
import ProgressUpdateButton from './ProgressUpdateButton'
import SolvedButton from './SolvedButton'
import StartDateButton from './StartDateButton'
import UnsolvedButton from './UnsolvedButton'

type ComponentProps = {
  createdOn: Date
  updatedOn: Date
  reportId: string
  reportSlug: string
  categories: Array<string>
  reportOwner: string
  userDisplayName: string
  userImageUrl: string | undefined
  communityButtonDisableState: boolean
  startDateButtonDisableState: boolean
}

export default function TrackingSideBar({
  createdOn,
  updatedOn,
  reportId,
  reportSlug,
  categories,
  reportOwner,
  userDisplayName,
  userImageUrl,
  communityButtonDisableState,
  startDateButtonDisableState,
}: ComponentProps) {
  const { userId } = auth()

  return (
    <Stack spacing={1}>
      <ReportStatusIndicator createdOn={createdOn} updatedOn={updatedOn} />
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
            <SummarizeRoundedIcon sx={{ color: 'secondary.600' }} />
          }
          sx={{ flex: 1 }}
          textColor={'primary.700'}
        >
          Repórtalo
        </Typography>
      </Stack>
      <Stack>
        <StartDateButton
          payload={payloadBuilder(
            reportId,
            userId as string,
            reportSlug,
            userDisplayName,
            userImageUrl,
            ReportEventType.OriginDate,
            '',
          )}
          shouldBeDisable={startDateButtonDisableState}
        />
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
      <Stack direction={'row'}>
        <Typography
          level="title-md"
          startDecorator={
            <FactCheckRoundedIcon sx={{ color: 'secondary.600' }} />
          }
          sx={{ flex: 1 }}
          textColor={'primary.700'}
        >
          Traquéalo
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
    </Stack>
  )
}
