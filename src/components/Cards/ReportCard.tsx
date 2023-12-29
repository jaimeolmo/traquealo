import { ImageAvatarsGroup } from '@/components/Avatar/ImageAvatarsGroup'
import { Issue } from '@/models/Issue'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'

type ComponentProps = {
  report: Issue
  sasToken: string
}

export default function ReportCard({ report, sasToken }: ComponentProps) {
  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <Typography
        sx={{
          height: '3rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical',
          width: '80%',
        }}
        textColor={'primary.900'}
      >
        <Link
          href={`/dashboard/reports/${report.reportSlug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {report.title}
        </Link>
      </Typography>
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <ImageAvatarsGroup media={report.media.thumb} sasToken={sasToken} />
        <Link
          href={`/dashboard/municipalities/${report.municipalitySlug}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            startDecorator={<LocationOnRoundedIcon />}
            textColor="neutral.400"
          >
            {report.municipality}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}
