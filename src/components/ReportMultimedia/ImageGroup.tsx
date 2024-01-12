/* eslint-disable @next/next/no-img-element */
'use client'
import Grid from '@mui/joy/Grid'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/styles.css'

type ComponentProps = {
  media: [] | never[]
  sasToken: string
}

export function ImageGroup({ media, sasToken }: ComponentProps) {
  const [open, setOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  const mediaWithToken = media.map((i: string) => ({
    src: `${i.replace('/thumb/', '/lg/')}?${sasToken}`,
  }))

  return (
    <>
      <Grid container spacing={1}>
        {media === undefined
          ? null
          : Array.isArray(media)
          ? media.map((i: string | null | undefined, index: number) => {
              return (
                <Grid key={i}>
                  <img
                    key={i}
                    src={`${i}?${sasToken}`}
                    alt="Foto descriptiva del area reportada"
                    style={{
                      height: '100px',
                      width: '100px',
                      borderRadius: 8,
                    }}
                    onClick={() => {
                      setImgIndex(index)
                      setOpen(true)
                    }}
                  />
                </Grid>
              )
            })
          : null}
      </Grid>
      <Lightbox
        plugins={[Counter]}
        index={imgIndex}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        open={open}
        close={() => setOpen(false)}
        slides={mediaWithToken}
      />
    </>
  )
}
