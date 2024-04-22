// Pinata Farcaster API
import type { FarcasterUser } from '@/type/farcaster'

// convert the above code using the fetch API
export const getFarcasterUserByFID = async (FID: number): Promise<FarcasterUser> => {
  const response = await fetch(`https://api.pinata.cloud/v3/farcaster/users/${FID}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
    },
  })
  const userResponse = await response.json()
  if (!response.ok) {
    throw new Error(userResponse.error as string)
  }
  return userResponse.data as FarcasterUser
}
