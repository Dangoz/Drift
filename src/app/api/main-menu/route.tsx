/* eslint-disable react/jsx-key */
import { MAIN_MENU_BACKGROUND } from '@/common/constants'
import { createFrames, Button } from 'frames.js/next'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  return {
    image: MAIN_MENU_BACKGROUND,
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button action="post" target="/api/read-bottle">
        Send Bottle 🌊
      </Button>,
      <Button action="post" target="/api/read-bottle">
        Find Bottle 🎣
      </Button>,
      <Button action="post" target="/api/read-bottle">
        My Collection 💌
      </Button>,
    ],
    textInput: 'Type something!',
  }
})

export const GET = handleRequest
export const POST = handleRequest
