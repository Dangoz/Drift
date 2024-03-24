/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next'
import { getRandomBottle } from '@/model/bottle'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const randomBottle = await getRandomBottle()
  console.log('randomBottle', randomBottle)

  console.log('message', ctx.message || 'no message')

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex">Reading the bottle 0-0</div>
      </div>
    ),
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button
        action="post"
        target={
          {
            // query: { pageIndex: (pageIndex - 1) % totalPages },
          }
        }
      >
        ←←
      </Button>,
      <Button
        action="post"
        target={
          {
            // query: { pageIndex: (pageIndex + 1) % totalPages },
          }
        }
      >
        →→
      </Button>,
    ],
    textInput: 'Type something!',
  }
})

export const POST = handleRequest
