import MunicipalitiesList from '@/components/Municipalities/MunicipalitiesList'
import municipalities from '@/utilities/municipalities.json'
import Sheet from '@mui/joy/Sheet'

export default function MunicipalitiesDashboard() {
  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4 }}>
      <h1>Municipios</h1>
      <MunicipalitiesList municipalities={municipalities} />
    </Sheet>
  )
}
