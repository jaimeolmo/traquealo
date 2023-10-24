'use client'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

export default function DataFromUser() {
  const { data, error, isLoading } = useSWR('/api/issues', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {Array.isArray(data) ? (
        data.map((issue: any) => (
          <div key={issue.id}>
            {issue.id} : {issue.title}
          </div>
        ))
      ) : (
        <p>There&apos;s currently no data available.</p>
      )}
    </div>
  )
}
