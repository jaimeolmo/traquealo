'use client'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import Button from '@mui/joy/Button'
import CircularProgress from '@mui/joy/CircularProgress'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

export default function DataFromUser({ userId }: { userId: string | null }) {
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/users/${userId}/reports`,
    fetcher,
  )

  if (error) return <div>Problemas descargando los datos.</div>
  if (isLoading)
    return (
      <Stack alignItems={'center'} sx={{ width: '100%' }}>
        <CircularProgress size="sm" variant="soft" />
      </Stack>
    )

  const reportsToDisplay = data?.slice(0, 10)

  return (
    <>
      {reportsToDisplay && Array.isArray(reportsToDisplay)
        ? reportsToDisplay.map((issue) => (
            <Stack key={issue.id} direction={'row'}>
              <Stack>
                <Link
                  href={`/dashboard/reports/${issue.reportSlug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography
                    startDecorator={
                      <DescriptionTwoToneIcon
                        color="primary"
                        fontSize="small"
                      />
                    }
                  />
                </Link>
              </Stack>
              <Stack>
                <Typography>
                  <Link
                    href={`/dashboard/reports/${issue.reportSlug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {issue.title}
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          ))
        : isValidating && <CircularProgress size="sm" variant="solid" />}
      {data && data.length > reportsToDisplay.length && (
        <Stack alignItems={'center'} sx={{ width: '100%' }}>
          <Link
            href={`/users/${userId}/reports`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color="secondary" variant="outlined">
              Ver más...
            </Button>
          </Link>
        </Stack>
      )}
    </>
  )
}
