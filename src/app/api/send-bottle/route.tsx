/* eslint-disable react/jsx-key, @next/next/no-img-element */
// import sharp from 'sharp'
import { EMPTY_SCROLL_BACKGROUND } from '@/common/constants'
import { createFrames, Button } from 'frames.js/next'
import { ImageResponse } from 'next/og'
import { imageResponseToBase64 } from '@/common/imageProcess'
import Image from 'next/image'

export const runtime = 'edge'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const isMessageSent: boolean = ctx.searchParams.messageSent === 'true'
  const inputMessage: string = ctx.message?.inputText || ''

  // If the message has been sent with an non-emoty message
  if (isMessageSent && inputMessage.trim().length > 0) {
    // make a request to /api/og and receive a ImageResponse
    // const imageResponse = await fetch('http://localhost:8000/api/og')

    // const imageResponse = new ImageResponse(
    //   (
    //     <div tw='flex flex-col w-full h-full'>
    //       <img
    //         src={EMPTY_SCROLL_BACKGROUND}
    //         alt="Empty Scroll Background"
    //         tw='w-full h-full object-cover z-0 absolute'
    //       />

    //       <div tw="p-2 text-white z-10">
    //         123123ko1j2io1jieo
    //       </div>
    //     </div>
    //   ),
    //   {
    //     width: 350,
    //     height: 350,
    //   }
    // )
    // const previewImageUrl = await imageResponseToBase64(imageResponse)

    return {
      // image: previewImageUrl,
      image: (
        <div tw="flex flex-col w-full h-full">
          <img
            src={EMPTY_SCROLL_BACKGROUND}
            alt="Empty Scroll Background"
            tw="w-full h-full object-cover z-0 absolute"
          />

          <div tw="p-2 text-white z-10">123123ko1j2io1jieo</div>
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
