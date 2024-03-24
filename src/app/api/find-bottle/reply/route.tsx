/* eslint-disable react/jsx-key, @next/next/no-img-element */
import { createFrames, Button } from 'frames.js/next'
import { getRandomBottle } from '@/model/bottle'
import { SEA_BACKGROUND, OPEN_FRAME } from '@/common/constants'
import { getFarcasterUserByFID } from '@/common/pinata'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const { authorFID, message, bottleId } = ctx.searchParams
  console.log('authorFID', authorFID)
  console.log('message', message)

  return {
    image: (
      <div tw="flex w-full h-full flex-col justify-center items-center">
        {/* background */}
        <img src={SEA_BACKGROUND} alt="Empty Scroll Background" tw="w-full h-full object-cover z-0 absolute" />

        {/* author */}
        <div tw="flex flex-col w-full h-40 items-start justify-center text-white z-10 absolute top-0 left-1">
          <div tw="w-8 h-8 rounded-full mr-2 bg-gray-300" />
          <div tw="w-16 h-4 bg-gray-300 mt-1" />
          <div tw="text-black text-sm break-words">{message}</div>
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
            authorFID: authorFID,
            message: message,
            bottleId: bottleId,
          },
          pathname: '/api/find-bottle/replied',
        }}
      >
        Reply 📝
      </Button>,
    ],
    textInput: 'Write a reply to the bottle',
    ...OPEN_FRAME,
  }
})

export const POST = handleRequest
