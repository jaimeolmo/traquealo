import Stack from '@mui/joy/Stack'
import Image from 'next/image'

export function Logo() {
  return (
    <Stack
      spacing={0}
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}/images/traquealo_logo_.svg`}
        alt={'Logo for the Traquealo brand'}
        width="32"
        height="32"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_URL}/images/logo_text.svg`}
        alt={'Text for the Traquealo brand'}
        width="120"
        height="32"
      />
    </Stack>
  )
}
