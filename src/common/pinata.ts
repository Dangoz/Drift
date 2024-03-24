// Pinata Farcaster API
import type { FarcasterUser } from '@/type/farcaster'

// convert the above code using the fetch API
export const getFarcasterUserByFID = async (FID: number): Promise<FarcasterUser> => {
  try {
    const response = await fetch(`https://api.pinata.cloud/v3/farcaster/users/${FID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
      },
    })
    const userResponse = await response.json()
    return userResponse.data as FarcasterUser
  } catch (error) {
    throw new Error(error as string)
  }
}
