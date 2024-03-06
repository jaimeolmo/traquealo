import Chip from '@mui/joy/Chip'

type ComponentProps = {
  createdOn: Date
  updatedOn: Date
}

const ReportStatus = {
  NEW: 'Nuevo',
  TREND: 'Trending',
  UPDATED: 'Actualizado',
} as const

export default function ReportStatusIndicator({
  createdOn,
  updatedOn,
}: ComponentProps) {
  const currentDate = new Date()
  const createdOnDate = new Date(createdOn)
  const updatedOnDate = new Date(updatedOn)

  const createdTimeDifference = currentDate.getTime() - createdOnDate.getTime()
  const updatedTimeDifference = currentDate.getTime() - updatedOnDate.getTime()

  const createdDaysDifference = createdTimeDifference / (1000 * 3600 * 24)
  const updatedDaysDifference = updatedTimeDifference / (1000 * 3600 * 24)

  const showNewStatus = createdDaysDifference <= 7
  const showUpdatedStatus = updatedDaysDifference <= 7

  const areDatesEqual = updatedOnDate.getTime() === createdOnDate.getTime()

  if (showNewStatus && showUpdatedStatus && !areDatesEqual) {
    return (
      <>
        <Chip color="primary">{ReportStatus.NEW}</Chip>
        <Chip color="secondary">{ReportStatus.UPDATED}</Chip>
      </>
    )
  } else if (showNewStatus) {
    return <Chip color="primary">{ReportStatus.NEW}</Chip>
  } else if (showUpdatedStatus && !areDatesEqual) {
    return <Chip color="secondary">{ReportStatus.UPDATED}</Chip>
  }

  return null
}
