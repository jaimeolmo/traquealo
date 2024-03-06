'use client'
import {
  SnackbarMessageType,
  useSnackbar,
} from '@/app/store/ui/SnackbarContext'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import Alert from '@mui/joy/Alert'
import IconButton from '@mui/joy/IconButton'
import LinearProgress from '@mui/joy/LinearProgress'
import Snackbar from '@mui/joy/Snackbar'
import Typography from '@mui/joy/Typography'

export default function BasicSnackbar() {
  const { snackbarOpen, snackbarMessage, closeSnackbar } = useSnackbar()

  let alertColor: SnackbarMessageType
  let alertTitle: string

  switch (snackbarMessage.type) {
    case SnackbarMessageType.warning:
      alertTitle = '¡Atención!'
      alertColor = SnackbarMessageType.warning
      break
    case SnackbarMessageType.danger:
      alertTitle = '¡Oh no, error!'
      alertColor = SnackbarMessageType.danger
      break
    case SnackbarMessageType.success:
      alertTitle = '¡Bravo!'
      alertColor = SnackbarMessageType.success

      break
    case SnackbarMessageType.primary:
      alertTitle = 'Información'
      alertColor = 'primary'
      break
    default:
      alertTitle = ''
      alertColor = SnackbarMessageType.neutral
  }

  return (
    <Snackbar
      autoHideDuration={3000}
      open={snackbarOpen}
      variant="soft"
      color={alertColor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => closeSnackbar(snackbarMessage)}
      sx={{ p: 0 }}
    >
      <Alert
        color={alertColor}
        variant="solid"
        invertedColors
        endDecorator={
          <IconButton
            variant="plain"
            onClick={() => closeSnackbar(snackbarMessage)}
            sx={{
              '--IconButton-size': '32px',
              transform: 'translate(0.5rem, -0.5rem)',
            }}
          >
            <CancelRoundedIcon />
          </IconButton>
        }
        sx={{ alignItems: 'flex-start', overflow: 'hidden', width: '100%' }}
      >
        <div>
          <Typography level="title-lg">{alertTitle}</Typography>
          <Typography level="body-sm">{snackbarMessage.content}</Typography>
        </div>
        <LinearProgress
          variant="solid"
          color={alertColor}
          value={40}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </Alert>
    </Snackbar>
  )
}
