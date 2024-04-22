// AIRSTACK Farcaster API
import { init, fetchQuery } from '@airstack/node'
import type { FarcasterUser } from '@/type/farcaster'

const farcasterUserQuery = `
query MyQuery($identity: Identity = "fc_fid:12314") {
  Socials(
    input: {filter: {dappName: {_eq: farcaster}, identity: {_eq: $identity}}, blockchain: ethereum}
  ) {
    Social {
      userId
      userAddress
      profileBio
      profileImage
      fnames
      profileDisplayName
      followerCount
      followingCount
      userRecoveryAddress
    }
  }
}
`

init(process.env.AIRSTACK_API_KEY || '', process.env.NODE_ENV === 'development' ? 'dev' : 'prod')

export const getFarcasterUserByFID = async (FID: number): Promise<FarcasterUser> => {
  const { data, error } = await fetchQuery(farcasterUserQuery, { identity: `fc_fid:${FID}` })
  const result = data.Socials.Social[0]
  if (error) {
    console.error(error)
    throw new Error(error)
  }
  const farcasterUser: FarcasterUser = {
    bio: result.profileBio,
    custody_address: result.userAddress,
    display_name: result.profileDisplayName,
    fid: result.userId,
    follower_count: result.followerCount,
    following_count: result.followingCount,
    pfp_url: result.profileImage,
    recovery_address: result.userRecoveryAddress,
    username: result.fnames[0],
  }
  console.log('farcasterUser', farcasterUser)
  return farcasterUser
}
