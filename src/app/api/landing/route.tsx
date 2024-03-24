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
      <Button action="post" target="/api/main-menu">
        START🌊🍾📜
      </Button>,
    ],
  }
})

export const GET = handleRequest
export const POST = handleRequest