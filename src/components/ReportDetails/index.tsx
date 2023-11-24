import { auth, clerkClient } from '@clerk/nextjs'
import EventIcon from '@mui/icons-material/Event'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type ComponentProps = {
  //   name: string
  createdOn: Date
  userId: string
}

async function getReportOwnerName(
  ownerUserId: string | null,
): Promise<string | null> {
  const { userId } = auth()

  if (!userId || !ownerUserId) {
    return null
  }

  const user = await clerkClient.users.getUser(ownerUserId)

  if (!user.username && !user.firstName && !user.lastName) {
    return 'Colaborador Registrado'
  }

  if (!user.username && user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }

  if (user.firstName && !user.lastName) {
    return user.firstName
  }

  return user.username
}

export default async function ReportOwnerAndDateCreated({
  //   name,
  createdOn,
  userId,
}: ComponentProps) {
  const ownerName = await getReportOwnerName(userId)

  return (
    <>
      <Typography startDecorator={<EventIcon />}>
        <Typography>
          Reportado el&nbsp;
          {format(createdOn, 'PPP', {
            locale: es,
          })}
          &nbsp;por&nbsp;
          {ownerName === 'Colaborador Registrado' ? (
            <Tooltip
              title="Nombre genérico cuando no se ha seleccionado un username o nombres en el registro."
              color="neutral"
              variant="outlined"
            >
              <Typography
                endDecorator={<InfoIcon />}
                sx={{ fontWeight: 700, display: 'inline' }}
              >
                {ownerName}
              </Typography>
            </Tooltip>
          ) : (
            <Typography sx={{ fontWeight: 700, display: 'inline' }}>
              {ownerName}
            </Typography>
          )}
        </Typography>
      </Typography>
    </>
  )
}
