// import { ImageResponse } from 'next/og'
// import sharp from 'sharp'
// // App router includes @vercel/og.
// // No need to install it.

// export const runtime = 'edge'

// export async function GET() {
//   const imageResponse = new ImageResponse(
//     (
//       <div
//         style={{
//           fontSize: 40,
//           color: 'black',
//           background: 'white',
//           width: '100%',
//           height: '100%',
//           padding: '50px 200px',
//           textAlign: 'center',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         👋 Hello
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     },
//   )

//   const image = await imageResponse.blob()
//   const imageBuffer = await image.arrayBuffer()

//   // sharp - potential issue on m1
//   const optimizedImageBuffer = await sharp(Buffer.from(imageBuffer))
//     .resize(500, 500) // Optional: Resize the image if needed
//     .jpeg({ quality: 80 }) // Convert to JPEG and reduce quality to optimize size
//     .toBuffer()
//   const data_url = `data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`

//   return Response.json({
//     imageDataUrl: data_url,
//   })
// }

import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

// export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
