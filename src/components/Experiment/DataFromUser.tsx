'use client'
import { Key } from 'react'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json())

export default function DataFromUser({ sasToken }: { sasToken: string }) {
  const { data, error, isLoading } = useSWR('/api/issues', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {data && Array.isArray(data) ? (
        data.map((issue: any) => (
          <>
            <h3>{issue.title}</h3>
            <div>
              {issue.media?.thumb === undefined
                ? null
                : Array.isArray(issue.media?.thumb)
                ? issue.media?.thumb.map((i: Key | null | undefined) => {
                    return (
                      <>
                        <img
                          key={i}
                          src={`${i}?${sasToken}`}
                          alt={issue.title}
                        />
                      </>
                    )
                  })
                : null}
            </div>
          </>
        ))
      ) : (
        <p>There&apos;s currently no data available.</p>
      )}
    </div>
  )
}
