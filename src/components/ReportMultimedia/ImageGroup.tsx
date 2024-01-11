/* eslint-disable @next/next/no-img-element */
import Grid from '@mui/joy/Grid'
import Link from 'next/link'
import { Key } from 'react'
import { UrlObject } from 'url'

type ComponentProps = {
  media: [] | never[]
  sasToken: string
}

export function ImageGroup({ media, sasToken }: ComponentProps) {
  return (
    <Grid container spacing={1}>
      {media === undefined
        ? null
        : Array.isArray(media)
        ? media.map((i: Key | null | undefined) => {
            return (
              <Grid key={i}>
                <Link
                  href={`${i}?${sasToken}` as unknown as UrlObject}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img
                    key={i}
                    src={`${i}?${sasToken}`}
                    alt="Foto descriptiva del area reportada"
                    style={{
                      height: '100px',
                      width: '100px',
                      borderRadius: 8,
                    }}
                  />
                </Link>
              </Grid>
            )
          })
        : null}
    </Grid>
  )
}
