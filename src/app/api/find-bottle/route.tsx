/* eslint-disable react/jsx-key, @next/next/no-img-element */
import { createFrames, Button } from 'frames.js/next'
import { getRandomBottle } from '@/model/bottle'
import { SEA_BACKGROUND_2, BROKEN_BOTTLE_BACKGROUND, OPEN_FRAME } from '@/common/constants'
import { getFarcasterUserByFID } from '@/common/pinata'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const data = await ctx.request.json()
  const { untrustedData, trustedData } = data
  const { fid } = untrustedData

  const randomBottle = (await getRandomBottle(fid)) || { authorFID: '0', message: 'No bottles found', id: '0' }
  console.log('randomBottle', randomBottle)
  console.log('ids', randomBottle.authorFID, fid)
  // const author = await getFarcasterUserByFID(randomBottle.authorFID)

  // if no bottles found
  if (randomBottle.authorFID === '0') {
    return {
      image: SEA_BACKGROUND_2,
      imageOptions: {
        aspectRatio: '1:1',
      },
      buttons: [
        <Button
          action="post"
          target={{
            pathname: '/api/main-menu',
          }}
        >
          🌊 Sea is Empty - Come back later
        </Button>,
      ],
      ...OPEN_FRAME,
    }
  }

  return {
    image: (
      <div tw="flex w-full h-full flex-col justify-center items-center">
        {/* background */}
        <img
          src={BROKEN_BOTTLE_BACKGROUND}
          alt="Empty Scroll Background"
          tw="w-full h-full object-cover z-0 absolute"
        />

        {/* author */}
        <div tw="flex flex-col w-full h-40 items-start justify-center text-white z-10 absolute top-0 left-1">
          <div tw="w-8 h-8 rounded-full mr-2 bg-gray-300" />
          <div tw="w-16 h-4 bg-gray-300 mt-1" />
          <div tw="text-black text-sm break-words">{randomBottle.message}</div>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: '1:1',
      width: 300,
      height: 300,
    },
    buttons: [
      <Button
        action="post"
        target={{
          query: {
            authorFID: randomBottle.authorFID,
            message: randomBottle.message,
            bottleId: randomBottle.id,
          },
          pathname: '/api/find-bottle/reply',
        }}
      >
        Reply 📝
      </Button>,
      <Button
        action="post"
        target={{
          pathname: '/api/main-menu',
        }}
      >
        Throw Away 🌊
      </Button>,
    ],
    ...OPEN_FRAME,
  }
})

export const POST = handleRequest
