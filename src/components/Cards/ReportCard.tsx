import { ImageAvatarsGroup } from '@/components/Avatar/ImageAvatarsGroup'
import { Issue } from '@/models/Issue'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardCover from '@mui/joy/CardCover'
import Divider from '@mui/joy/Divider'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import ReportStatusIndicator from '../ReportStatusIndicator'

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
      <CardContent>
        <Typography
          sx={{
            height: '3.55rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: 'vertical',
            width: '80%',
            fontSize: '1.125rem',
            fontWeight: 500,
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
      </CardContent>
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <ImageAvatarsGroup
          media={report.media.thumb}
          sasToken={sasToken}
          reportSlug={report.reportSlug}
        />
      </CardContent>
      <Divider inset="context" />
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(250,250,250,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(250,250,250,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent orientation="horizontal">
        <Stack direction={'row'} sx={{ width: '100%' }} alignItems={'center'}>
          <Stack sx={{ width: '50%' }}>
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
          </Stack>
          <Stack sx={{ width: '50%' }}>
            <Box sx={{ textAlign: 'right' }}>
              <ReportStatusIndicator createdOn={report.createdOn} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
