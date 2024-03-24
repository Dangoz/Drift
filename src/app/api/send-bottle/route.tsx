/* eslint-disable react/jsx-key */
import { EMPTY_SCROLL_BACKGROUND } from '@/common/constants'
import { createFrames, Button } from 'frames.js/next'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  return {
    image: EMPTY_SCROLL_BACKGROUND,
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button action="post" target="/api/send-bottle">
        Send Message
      </Button>,
    ],
    textInput: 'Write a message',
  }
})

export const POST = handleRequest
