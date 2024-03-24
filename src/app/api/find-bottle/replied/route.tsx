/* eslint-disable react/jsx-key, @next/next/no-img-element */
import { createFrames, Button } from 'frames.js/next'
import { replyToBottle } from '@/model/bottle'
import { BROKEN_BOTTLE_BACKGROUND, OPEN_FRAME } from '@/common/constants'
import { getFarcasterUserByFID } from '@/common/pinata'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const { authorFID, message, bottleId } = ctx.searchParams
  console.log('authorFID', authorFID)
  console.log('message', message)

  // get untrusted data
  const data = await ctx.request.json()
  const { untrustedData } = data
  console.log('untrustedData', untrustedData)
  const { fid: replierFID, inputText: reply, timestamp: repliedAt } = untrustedData
  console.log('destructed data', replierFID, reply, repliedAt)

  const author = await getFarcasterUserByFID(+authorFID)
  const replier = await getFarcasterUserByFID(replierFID)
  console.log('author', author)
  console.log('replier', replier)

  // reply to the bottle
  const bottle = await replyToBottle(bottleId, replierFID, reply, repliedAt)
  console.log('replied bottle', bottle)

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
          <div tw="text-black text-sm break-words">{message}</div>
        </div>

        {/* replier, shift the styles to the right side instead of left */}
        <div tw="flex flex-col w-full h-40 items-end justify-center text-white z-10 absolute bottom-0 right-5">
          <img src={replier.pfp_url} alt="Empty Scroll Background" tw="w-8 h-8 rounded-full mr-2" />
          <div tw="text-lg font-bold text-purple-800">{replier.display_name}</div>
          <div tw="text-black text-sm break-words">{reply}</div>
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
          },
          pathname: '/api/main-menu',
        }}
      >
        🔒 Message Sealed - Back to Menu
      </Button>,
      <Button action="link" target={`https://warpcast.com/${author.username}`}>
        🌐 View Author Profile
      </Button>,
    ],
    ...OPEN_FRAME,
  }
})

export const POST = handleRequest
