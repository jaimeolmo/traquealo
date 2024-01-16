/* eslint-disable @next/next/no-img-element */
'use client'
import Grid from '@mui/joy/Grid'
import { useState } from 'react'
import Lightbox, { Slide } from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'

type ComponentProps = {
  media: [] | never[]
  sasToken: string
}

export function ImageGroup({ media, sasToken }: ComponentProps) {
  const [open, setOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  const mediaWithToken = media.map((i: string) => {
    if (i.includes('/vthumb/')) {
      let fileObject = i
      const lastDotIndex = fileObject.lastIndexOf('.')

      if (lastDotIndex !== -1) {
        fileObject = fileObject.substring(0, lastDotIndex)
      } else {
        return [] as unknown as Slide
      }

      return {
        type: 'video',
        sources: [
          {
            src: `${fileObject.replace(
              '/vthumb/',
              '/720_h264_encoded/',
            )}.mp4?${sasToken}`,
            type: 'video/mp4',
          },
          {
            src: `${fileObject.replace(
              '/vthumb/',
              '/720_webm_encoded/',
            )}.webm?${sasToken}`,
            type: 'video/webm',
          },
        ],
        autoPlay: true,
        muted: true,
      }
    } else {
      return { src: `${i.replace('/thumb/', '/lg/')}?${sasToken}` }
    }
  }) as unknown as Slide[]

  if (!mediaWithToken) return null

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
                      cursor: 'pointer',
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
        plugins={[Counter, Video]}
        index={imgIndex}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        open={open}
        close={() => setOpen(false)}
        slides={mediaWithToken}
      />
    </>
  )
}
