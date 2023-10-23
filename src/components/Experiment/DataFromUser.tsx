'use client'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

export default function DataFromUser() {
  const { data, error, isLoading } = useSWR('/api/issues', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div>
      {data.map((issue: any) => (
        <div key={issue.id}>
          {issue.id} : {issue.title}
        </div>
      ))}
    </div>
  )
}
