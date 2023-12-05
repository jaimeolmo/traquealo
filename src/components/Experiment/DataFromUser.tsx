'use client'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

export default function DataFromUser({
  sasToken,
  userId,
}: {
  sasToken: string
  userId: string | null
}) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${userId}/reports`,
    fetcher,
  )

  if (error) return <div>Problemas descargando los datos.</div>
  if (isLoading) return <div>Loading...</div>

  const reportsToDisplay = data.slice(0, 10)

  return (
    <>
      {reportsToDisplay && Array.isArray(reportsToDisplay) ? (
        reportsToDisplay.map((issue: any) => (
          <Stack key={issue.id} direction={'row'}>
            <Stack>
              <Link
                href={`/dashboard/reports/${issue.reportSlug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  startDecorator={
                    <DescriptionTwoToneIcon color="primary" fontSize="small" />
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
      ) : (
        <p>There&apos;s currently no data available.</p>
      )}
      <Link
        href={`/users/${userId}/reports`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Button color="secondary" size="sm" variant="outlined" fullWidth>
          Todos mis reportes
        </Button>
      </Link>
    </>
  )
}
