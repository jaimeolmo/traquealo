'use client'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import * as React from 'react'
import AvatarWithStatus from './AvatarWithStatus'
import ChatBubble from './ChatBubble'
import { ChatProps } from './data'

type UserProps = {
  name: string
  username: string
  avatar: string
  online: boolean
}

type MessageProps = {
  id: string
  content: string
  timestamp: string
  unread?: boolean
  sender: UserProps | 'You'
  attachment?: {
    fileName: string
    type: string
    size: string
  }
}

type MessagesPaneProps = {
  chat: ChatProps
}

export default function MessagesPane(props: MessagesPaneProps) {
  const { chat } = props
  const [chatMessages, setChatMessages] = React.useState(chat.messages)

  React.useEffect(() => {
    setChatMessages(chat.messages)
  }, [chat.messages])

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
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You'
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.sender !== 'You' && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? 'sent' : 'received'}
                  {...message}
                />
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Sheet>
  )
}
