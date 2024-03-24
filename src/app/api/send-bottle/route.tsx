/* eslint-disable react/jsx-key */
import { EMPTY_SCROLL_BACKGROUND } from '@/common/constants'
import { createFrames, Button } from 'frames.js/next'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const isMessageSent: boolean = ctx.searchParams.messageSent === 'true'
  const inputMessage: string = ctx.message?.inputText || ''

  // If the message has been sent with an non-emoty message
  if (isMessageSent && inputMessage.trim().length > 0) {
    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex">Message Sent!</div>
          <div tw="flex">Message: {inputMessage}</div>
        </div>
      ),
      imageOptions: {
        aspectRatio: '1:1',
      },
      buttons: [
        <Button
          action="post"
          target={{
            query: {
              messageSent: false,
            },
          }}
        >
          Seal & Send 🌊
        </Button>,
      ],
    }
  }

  return {
    image: EMPTY_SCROLL_BACKGROUND,
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button
        action="post"
        target={{
          query: {
            messageSent: true,
          },
          pathname: '/api/send-bottle',
        }}
      >
        Write Message 🖊
      </Button>,
    ],
    textInput: 'Write a message',
  }
})

export const POST = handleRequest
