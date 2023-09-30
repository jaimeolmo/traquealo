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
        src={'../images/traquealo_logo_.svg'}
        alt={'Logo for the traquealo brand.'}
        width="32"
        height="32"
        style={{ marginLeft: '8px' }}
      />
      <Image
        src={'../images/logo_text.svg'}
        alt={'Text for the traquealo brand.'}
        width="120"
        height="32"
      />
    </Stack>
  )
}
