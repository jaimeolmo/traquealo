'use client'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import Button from '@mui/joy/Button'
import DialogActions from '@mui/joy/DialogActions'
import DialogContent from '@mui/joy/DialogContent'
import DialogTitle from '@mui/joy/DialogTitle'
import Divider from '@mui/joy/Divider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteButton({ reportId }: { reportId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Button
        startDecorator={<DeleteRoundedIcon />}
        aria-label="borrar reporte"
        color="danger"
        variant="plain"
        onClick={() => setOpen(true)}
      >
        Borrar
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmar
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas descartar este reporte?
            </Typography>
            <Typography level="body-sm">
              Ten en cuenta que esta acción es permanente y los datos no serán
              recuperables.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              loading={loading}
              onClick={() => {
                setLoading(true)
                deleteReport(reportId, router)
              }}
            >
              Borrar reporte
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

async function deleteReport(reportId: string, router: AppRouterInstance) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ISSUE_API_URL}/${reportId}` as string,
    {
      method: 'DELETE',
    },
  )
  // TODO: If we like to handle error in the component to use a toast, return the response and handle error logic in the component.
  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status} ${response.statusText}`,
    )
  }

  router.push('/dashboard')
}
