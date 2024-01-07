import { ReportEvent } from '@/models/ReportEvent'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import MsgBubble from './MsgBubble'

type MessagesPaneProps = {
  events: Array<ReportEvent>
  currentUserId: string | null
}

export default async function MessagesPane(props: MessagesPaneProps) {
  const { events, currentUserId } = props

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {events.map((event: ReportEvent) => {
            const isYou = event.userId === 'user_system'

            return (
              <Stack
                key={event.id}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {event.userId !== 'user_system' && (
                  <Avatar src={event.userImageUrl} />
                )}
                <MsgBubble
                  variant={isYou ? 'sent' : 'received'}
                  {...event}
                  currentUserId={currentUserId}
                />
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Sheet>
  )
}
