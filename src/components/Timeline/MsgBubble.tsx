'use client'
import { ReportEvent, ReportEventType } from '@/models/ReportEvent'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import DeleteEventButton from './DeleteEventButton'

type MsgBubbleProps = ReportEvent & {
  variant: 'sent' | 'received'
} & {
  currentUserId: string | null
}

export default function MsgBubble(props: MsgBubbleProps) {
  const {
    id,
    variant,
    timestamp,
    description,
    userDisplayName,
    currentUserId,
    userId,
    type,
  } = props
  const isSent = variant === 'sent'

  const iconAndColor = getEventTypeIconAndColor(type as ReportEventType)

  return (
    <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">{userDisplayName}</Typography>
        <Typography level="body-xs">
          {format(new Date(timestamp), 'PPP', {
            locale: es,
          })}
        </Typography>
      </Stack>
      <Box>
        <Stack
          direction="row"
          alignContent={'center'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Sheet
            color={isSent ? 'primary' : 'secondary'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borde: '1px solid red',
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'var(--joy-palette-primary-solidBg)'
                : iconAndColor.color,
            }}
          >
            <Typography
              endDecorator={isSent ? null : iconAndColor.icon}
              level="body-sm"
              sx={{
                color: isSent
                  ? 'var(--joy-palette-common-white)'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {description}
            </Typography>
          </Sheet>
          {!isSent && currentUserId === userId && (
            <Box>
              <Stack
                direction="row"
                justifyContent={isSent ? 'flex-end' : 'flex-start'}
                spacing={0.5}
                sx={{
                  p: 1,
                  pr: 0,
                }}
              >
                <DeleteEventButton eventId={id} />
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}

function getEventTypeIconAndColor(type: ReportEventType) {
  if (type === ReportEventType.ProgressUpdate) {
    return {
      icon: <EngineeringRoundedIcon color="secondary" />,
      color: 'var(--joy-palette-secondary-softBg)',
    }
  }

  if (type === ReportEventType.Unsolved) {
    return {
      icon: <ThumbDownRoundedIcon sx={{ color: 'danger.500' }} />,
      color: 'var(--joy-palette-danger-softBg)',
    }
  }

  if (type === ReportEventType.Solved) {
    return {
      icon: <ThumbUpRoundedIcon color="success" />,
      color: 'var(--joy-palette-success-softBg)',
    }
  }

  if (type === ReportEventType.OriginDate) {
    return {
      icon: <CalendarMonthRoundedIcon sx={{ color: 'neutral.500' }} />,
      color: 'var(--joy-palette-neutral-softBg)',
    }
  }

  if (
    type === ReportEventType.TitleUpdated ||
    type === ReportEventType.DescriptionUpdated
  ) {
    return {
      icon: <ListAltRoundedIcon sx={{ color: 'primary.500' }} />,
      color: 'var(--joy-palette-primary-softBg)',
    }
  }

  return {
    icon: <Groups2RoundedIcon sx={{ color: 'neutral.500' }} />,
    color: 'var(--joy-palette-neutral-softBg)',
  }
}
