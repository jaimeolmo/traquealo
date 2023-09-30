'use client'
import { useUser } from '@clerk/nextjs'
import Button from '@mui/joy/Button'
import Link from 'next/link'

export function ButtonCreate() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <Link href="/dashboard" passHref>
      <Button color="secondary">Dashboard</Button>
    </Link>
  )
}
