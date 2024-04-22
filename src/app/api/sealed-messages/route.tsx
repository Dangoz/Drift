/* eslint-disable react/jsx-key, @next/next/no-img-element */
import { createFrames, Button } from 'frames.js/next'
import { getSealedBottles } from '@/model/bottle'
import { SEA_BACKGROUND_2, BROKEN_BOTTLE_BACKGROUND, OPEN_FRAME } from '@/common/constants'
import { getFarcasterUserByFID } from '@/common/airstack'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const data = await ctx.request.json()
  const { untrustedData, trustedData } = data
  const { fid } = untrustedData

  const bottles = await getSealedBottles(fid)

  // if no bottles found
  if (bottles.length === 0) {
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
      OPEN_FRAME,
    }
  }

  // generate a random bottle
  const demoBottle = bottles[Math.floor(Math.random() * bottles.length)]

  const author = await getFarcasterUserByFID(demoBottle.authorFID)
  const replier = await getFarcasterUserByFID(demoBottle.replierFID as number)

  const anotherUsername = author.fid === fid ? replier.username : author.username

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
        <div tw="flex flex-col w-full h-40 items-start justify-center text-white z-10 absolute top-0 left-5">
          <img src={author.pfp_url} alt="Empty Scroll Background" tw="w-8 h-8 rounded-full mr-2" />
          <div tw="text-lg font-bold text-purple-800">{author.display_name}</div>
          <div tw="text-black text-sm break-words">{demoBottle.message}</div>
        </div>

        {/* replier, shift the styles to the right side instead of left */}
        <div tw="flex flex-col w-full h-40 items-end justify-center text-white z-10 absolute bottom-0 right-5">
          <img src={replier.pfp_url} alt="Empty Scroll Background" tw="w-8 h-8 rounded-full mr-2" />
          <div tw="text-lg font-bold text-purple-800">{replier.display_name}</div>
          <div tw="text-black text-sm break-words">{demoBottle.reply}</div>
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
          pathname: '/api/sealed-messages',
        }}
      >
        🔄
      </Button>,
      <Button action="link" target={`https://warpcast.com/${anotherUsername}`}>
        🌐 View Profile
      </Button>,
      <Button
        action="post"
        target={{
          pathname: '/api/main-menu',
        }}
      >
        Back to Menu
      </Button>,
    ],
    ...OPEN_FRAME,
  }
})

export const POST = handleRequest
