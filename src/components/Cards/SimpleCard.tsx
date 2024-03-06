import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'

type SimpleCardProps = {
  cardTitle: string
  cardContent: string
  arialLabelDescription: string
}

export function SimpleCard({ cardTitle, cardContent }: SimpleCardProps) {
  return (
    <Card
      sx={{
        width: 320,
        zIndex: 0,
        background: 'var(--joy-palette-common-white)',
      }}
    >
      <CardContent>
        <>
          <Typography level="h3" sx={{ fontWeight: 700 }}>
            {cardTitle}
          </Typography>
          {cardContent}
        </>
      </CardContent>
    </Card>
  )
}
