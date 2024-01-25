'use client'
import MunicipalityCard from '@/components/Cards/MunicipalityCard'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import Link from 'next/link'
import { useState } from 'react'

type Municipality = {
  id: string
  name: string
  population: number
  slug: string
}

type ComponentProps = {
  municipalities: Array<Municipality>
}

export default function MunicipalitiesList({ municipalities }: ComponentProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value)
  }

  const filteredMunicipalities = municipalities.filter((municipality) =>
    municipality.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <Input
        name="Search"
        color="neutral"
        placeholder="Filtrar municipios"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        size="lg"
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2}>
        {filteredMunicipalities.map((municipality) => (
          <Grid xs={12} md={6} lg={4} key={municipality.id}>
            <Link
              href={`/dashboard/municipalities/${municipality.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <MunicipalityCard municipality={municipality} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
