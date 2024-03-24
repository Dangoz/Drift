/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next'
import { createBottle } from '@/model/bottle'
import { SENT_BOTTLE_BACKGROUND, OPEN_FRAME } from '@/common/constants'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const inputMessage: string = ctx.searchParams.inputMessage || ''
  console.log('inputMessage', inputMessage)

  const data = await ctx.request.json()
  const { untrustedData, trustedData } = data
  const { fid, timestamp } = untrustedData
  console.log('untrustedData', untrustedData)

  const bottle = await createBottle(fid, inputMessage, timestamp)
  console.log('bottle', bottle)

  return {
    image: SENT_BOTTLE_BACKGROUND,
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
        🌊 Bottle Sent - Back to Menu
      </Button>,
    ],
    ...OPEN_FRAME,
  }
})

export const POST = handleRequest
