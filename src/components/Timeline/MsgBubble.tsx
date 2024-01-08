'use client'
import { ReportEvent, ReportEventType } from '@/models/ReportEvent'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import * as React from 'react'
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
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  const iconAndColor = getEventTypeIconAndColor(type as ReportEventType)

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">{userDisplayName}</Typography>
        <Typography level="body-xs">
          {format(new Date(timestamp), 'PPP', {
            locale: es,
          })}
        </Typography>
      </Stack>
      <Box
        sx={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Sheet
          color={isSent ? 'primary' : 'secondary'}
          variant={isSent ? 'solid' : 'soft'}
          sx={{
            p: 1.25,
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
        {isHovered && !isSent && currentUserId === userId && (
          <Stack
            direction="row"
            justifyContent={isSent ? 'flex-end' : 'flex-start'}
            spacing={0.5}
            sx={{
              position: 'absolute',
              top: '50%',
              p: 1.5,
              ...(isSent
                ? {
                    left: 0,
                    transform: 'translate(-100%, -50%)',
                  }
                : {
                    right: 0,
                    transform: 'translate(100%, -50%)',
                  }),
            }}
          >
            <DeleteEventButton eventId={id} />
          </Stack>
        )}
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

  return {
    icon: <Groups2RoundedIcon sx={{ color: 'neutral.500' }} />,
    color: 'var(--joy-palette-neutral-softBg)',
  }
}
