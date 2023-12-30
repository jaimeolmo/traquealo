import Avatar from '@mui/joy/Avatar'
import AvatarGroup from '@mui/joy/AvatarGroup'
import Stack from '@mui/joy/Stack'
import { Key } from 'react'

type ComponentProps = {
  media: [] | never[]
  sasToken: string
}

export function ImageAvatarsGroup({ media, sasToken }: ComponentProps) {
  const { avatars, surplus } = clampAvatars(media)

  return (
    <Stack direction={'row'} sx={{ height: '100px' }}>
      <AvatarGroup>
        {avatars === undefined
          ? null
          : Array.isArray(avatars)
          ? avatars.map((i: Key | null | undefined) => {
              return (
                <>
                  <Avatar
                    key={i}
                    src={`${i}?${sasToken}`}
                    alt="Foto descriptiva del area reportada"
                    sx={{
                      height: '60px',
                      width: '60px',
                      borderRadius: 8,
                    }}
                  />
                </>
              )
            })
          : null}
        {!!surplus && (
          <Avatar
            sx={{
              height: '60px',
              width: '60px',
              borderRadius: 8,
            }}
          >
            +{surplus}
          </Avatar>
        )}
      </AvatarGroup>
    </Stack>
  )
}

function clampAvatars<T>(avatars: Array<T>) {
  const maxAvatars = 3
  const totalAvatars = avatars.length
  let surplus = 0
  if (totalAvatars > maxAvatars) {
    surplus = totalAvatars - maxAvatars
  }

  return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus }
}
