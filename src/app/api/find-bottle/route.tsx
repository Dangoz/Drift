/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next'
import { getRandomBottle } from '@/model/bottle'
import { EMPTY_SCROLL_BACKGROUND } from '@/common/constants'
import { getFarcasterUserByFID } from '@/common/pinata'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const randomBottle = await getRandomBottle()
  const author = await getFarcasterUserByFID(randomBottle.authorFID)

  return {
    image: (
      <div tw="flex w-full h-full flex-col justify-center items-center">
        {/* background */}

        {/* author */}
        <div tw="flex flex-col w-full h-40 items-start justify-center text-white z-10 absolute top-0 left-1">
          {/* <img src={author.pfp_url} alt="Empty Scroll Background" tw="w-8 h-8 rounded-full mr-2" /> */}
          {/* instead of showing the avatar, show a grey placeholder of the same style */}
          <div tw="w-8 h-8 rounded-full mr-2 bg-gray-300" />
          {/* <div tw="text-lg font-bold text-purple-500">{author.display_name}</div> */}
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
          },
          pathname: '/api/send-bottle',
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
  }
})

export const POST = handleRequest
