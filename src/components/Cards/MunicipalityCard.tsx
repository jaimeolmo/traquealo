import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardCover from '@mui/joy/CardCover'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

type ComponentProps = {
  municipality: {
    name: string
    population: number
    slug: string
  }
}

export default function MunicipalityCard({ municipality }: ComponentProps) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        zIndex: 0,
        '&:hover': {
          boxShadow: 'md',
          borderColor: 'neutral.outlinedHoverBorder',
        },
      }}
    >
      <CardCover
        sx={{
          background: `url("/images/Puerto_Rico_municipios_${municipality.slug}_map.svg")`,
          backgroundPosition: 'right',
          backgroundSize: '70%, auto, contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.75,
        }}
      />
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {municipality.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box>Población:</Box>
          <Box sx={{ fontWeight: 'bold' }}>
            {municipality.population.toLocaleString()}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
