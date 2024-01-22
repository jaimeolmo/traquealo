'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface SnackbarContextProps {
  snackbarOpen: boolean
  snackbarMessage: SnackbarMessage
  openSnackbar: (message: SnackbarMessage) => void
  closeSnackbar: (message: SnackbarMessage) => void
}

export const SnackbarMessageType = {
  warning: 'warning',
  danger: 'danger',
  success: 'success',
  primary: 'primary',
  neutral: 'neutral',
} as const

export type SnackbarMessageType = keyof typeof SnackbarMessageType

interface SnackbarMessage {
  type: SnackbarMessageType
  content: string
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
)

interface SnackbarProviderProps {
  children: ReactNode
  defaultType?: SnackbarMessageType
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage>({
    type: SnackbarMessageType.neutral,
    content: '',
  })

  const openSnackbar = (message: SnackbarMessage | string) => {
    if (typeof message === 'string') {
      // Backward compatibility: If the message is a string, treat it as an information message.
      setSnackbarMessage({
        type: SnackbarMessageType.primary,
        content: message,
      })
    } else {
      setSnackbarMessage(message)
    }
    setSnackbarOpen(true)
  }

  const closeSnackbar = (message: SnackbarMessage) => {
    setSnackbarOpen(false)
    setSnackbarMessage(message)
  }

  return (
    <SnackbarContext.Provider
      value={{ snackbarOpen, snackbarMessage, openSnackbar, closeSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
