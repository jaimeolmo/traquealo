import AgenciesMenu from '@/components/AgenciesMenu'
import CategoriesMenu from '@/components/CategoriesMenu'
import ReportStatusIndicator from '@/components/ReportStatusIndicator'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CategoryIcon from '@mui/icons-material/Category'
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Groups3Icon from '@mui/icons-material/Groups3'
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

type ComponentProps = {
  createdOn: Date
  reportSlug: string
}

export default function TrackingSideBar({
  createdOn,
  reportSlug,
}: ComponentProps) {
  return (
    <Box>
      <Stack spacing={1}>
        <ReportStatusIndicator createdOn={createdOn} />
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={<Groups3Icon />}
            sx={{ flex: 1 }}
          >
            Responsables
          </Typography>
          <AgenciesMenu />
        </Stack>
        <Typography>Lista de agencias responsables</Typography>
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={<CategoryIcon />}
            sx={{ flex: 1 }}
          >
            Categorías
          </Typography>
          <CategoriesMenu />
        </Stack>
        <Stack>Lista de categorías</Stack>
        <Stack direction={'row'}>
          <Typography
            level="title-md"
            startDecorator={<FactCheckRoundedIcon />}
            sx={{ flex: 1 }}
          >
            Traquealo
          </Typography>
        </Stack>

        <Stack>
          <Button
            startDecorator={<ThumbUpRoundedIcon />}
            aria-label="resuelto"
            color="success"
          >
            Reportar resuelto
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<ThumbDownRoundedIcon />}
            aria-label="resuelto"
            color="danger"
          >
            Reportar sin resolver
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<ConnectWithoutContactRoundedIcon />}
            aria-label="resuelto"
            color="secondary"
          >
            Reportar progreso
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<CalendarMonthRoundedIcon />}
            aria-label="resuelto"
            color="neutral"
            variant="soft"
          >
            ¿Desde cuándo?
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<Groups2RoundedIcon />}
            aria-label="resuelto"
            color="neutral"
            variant="soft"
          >
            ¿Impacta mi comunidad?
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<FlagRoundedIcon />}
            aria-label="flag this report"
            color="warning"
            variant="outlined"
          >
            Reportar como abusivo
          </Button>
        </Stack>
        <Stack>
          <Button
            startDecorator={<DeleteRoundedIcon />}
            aria-label="borrar reporte"
            color="danger"
            variant="outlined"
          >
            Borrar
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
