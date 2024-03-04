import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/joy/Button'
import Link from 'next/link'

export default function InvitationTracking() {
  return (
    <>
      <Link prefetch={false} href="/invitaciones" passHref>
        <Button fullWidth startDecorator={<MailIcon />} variant="soft">
          Invitaciones
        </Button>
      </Link>
    </>
  )
}
