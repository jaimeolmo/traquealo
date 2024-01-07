'use client'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import * as React from 'react'
import DeleteEventButton from './DeleteEventButton'

type MessageProps = {
  id?: string
  timestamp: Date
  description: string
  userDisplayName: string
  currentUserId: string | null
  userId: string
}

type MsgBubbleProps = MessageProps & {
  variant: 'sent' | 'received'
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
  } = props
  const isSent = variant === 'sent'
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

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
          color={isSent ? 'primary' : 'neutral'}
          variant={isSent ? 'solid' : 'soft'}
          sx={{
            p: 1.25,
            borderRadius: 'lg',
            borderTopRightRadius: isSent ? 0 : 'lg',
            borderTopLeftRadius: isSent ? 'lg' : 0,
            backgroundColor: isSent
              ? 'var(--joy-palette-primary-solidBg)'
              : 'background.body',
          }}
        >
          <Typography
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
