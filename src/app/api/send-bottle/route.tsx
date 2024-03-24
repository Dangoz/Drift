/* eslint-disable react/jsx-key, @next/next/no-img-element */
// import sharp from 'sharp'
import { EMPTY_SCROLL_BACKGROUND } from '@/common/constants'
import { createFrames, Button } from 'frames.js/next'
import { imageResponseToBase64 } from '@/common/imageProcess'
import { getFarcasterUserByFID } from '@/common/pinata'

export const runtime = 'edge'

const frames = createFrames()

const handleRequest = frames(async (ctx) => {
  const isMessageSent: boolean = ctx.searchParams.messageSent === 'true'
  console.log('message', ctx.message || 'no message')

  const data = await ctx.request.json()
  const { untrustedData, trustedData } = data
  console.log('untrustedData', untrustedData)
  console.log('trustedData', trustedData)

  const inputMessage = untrustedData.inputText || ''

  // If the message has been sent with an non-emoty message
  if (isMessageSent && inputMessage.trim().length > 0) {
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

    console.log('fid', untrustedData.fid, typeof untrustedData.fid)
    const farcasterUser = await getFarcasterUserByFID(untrustedData.fid)
    console.log('farcasterUser', farcasterUser)

    return {
      // image: previewImageUrl,
      image: (
        <div tw="flex flex-col w-full h-full items-center justify-center">
          <img
            src={EMPTY_SCROLL_BACKGROUND}
            alt="Empty Scroll Background"
            tw="w-full h-full object-cover z-0 absolute"
          />

          <div tw="flex flex-col w-48 h-48 items-center justify-center text-white z-10">
            <img src={farcasterUser.pfp_url} alt="Empty Scroll Background" tw="w-8 h-8 rounded-full mr-2" />
            <div tw="text-lg font-bold text-purple-500">{farcasterUser.display_name}</div>
            <div tw="text-black text-sm break-words">{inputMessage}</div>
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
