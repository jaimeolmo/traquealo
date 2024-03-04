import { randomInt } from 'crypto'

export function generateInvitationCode(): string {
  const lowerBound = 100000 // Starting point for 6-digit numbers (excluding leading zero)
  const upperBound = 999999 // Inclusive upper bound
  const randomIntValue = randomInt(lowerBound, upperBound + 1) // +1 to include upperBound
  return randomIntValue.toString().padStart(6, '0') // Left-pad with zeros if necessary
}
