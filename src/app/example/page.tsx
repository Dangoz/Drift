import { URL as _URL } from '@/common/constants'
import type { Metadata } from 'next'
import { fetchMetadata } from 'frames.js/next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'example',
    description: '...',
    other: {
      ...(await fetchMetadata(new URL('frames', _URL))),
    },
  }
}

export default async function Home() {
  return <div>Multi-page example</div>
}
