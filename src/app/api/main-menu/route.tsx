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
      <Button action="post" target="/api/send-bottle">
        Send Bottle 🌊
      </Button>,
      <Button action="post" target="/api/find-bottle">
        Find Bottle 🎣
      </Button>,
      <Button action="post" target="/api/sealed-messages">
        Sealed Messages 💌
      </Button>,
    ],
  }
})

export const POST = handleRequest
