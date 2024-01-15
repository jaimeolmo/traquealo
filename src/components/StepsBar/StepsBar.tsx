import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import { SimpleCard } from '../Cards/SimpleCard'

export function StepsBar() {
  return (
    <Sheet
      sx={{
        width: '100%',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ maxWidth: '1024px', margin: 'auto', pb: 4, px: 2 }}
        alignItems={{ xs: 'center', sm: 'unset' }}
        spacing={2}
      >
        <SimpleCard
          cardTitle={'Obsérvalo'}
          cardContent={
            'Identifica en tu área posibles problemas que afectan la comunidad.'
          }
          arialLabelDescription={''}
        />
        <SimpleCard
          cardTitle={'Repórtalo'}
          cardContent={
            'A través de nuestras cuentas sociales o accede a nuestro sistema para actualizar detalles del evento.'
          }
          arialLabelDescription={''}
        />
        <SimpleCard
          cardTitle={'Traquéalo'}
          cardContent={
            'Acá nos encargaremos de consolidar todos los reportes de tu comunidad. Identificaremos responsables y monitorearemos el evento hasta que pueda ser resuelto.'
          }
          arialLabelDescription={''}
        />
      </Stack>
    </Sheet>
  )
}
