import type { ImageResponse } from 'next/og'

// utils for processing image

// Convert ImageResponse data to Base64
export const imageResponseToBase64 = async (imageResponse: ImageResponse) => {
  const image = await imageResponse.blob()
  const imageBuffer = await image.arrayBuffer()
  const data_url = `data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`
  return data_url
}
