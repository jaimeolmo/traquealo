import Chip from '@mui/joy/Chip'

type ComponentProps = {
  createdOn: Date
}

const ReportStatus = {
  NEW: 'Nuevo',
  TREND: 'Trending',
  UPDATED: 'Actualizado',
} as const

export default function ReportStatusIndicator({ createdOn }: ComponentProps) {
  const currentDate = new Date()
  const createdOnDate = new Date(createdOn)
  const timeDifference = currentDate.getTime() - createdOnDate.getTime()
  const daysDifference = timeDifference / (1000 * 3600 * 24)

  if (daysDifference <= 7) {
    return <Chip color="primary">Nuevo</Chip>
  }

  return null
}
