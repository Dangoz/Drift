export const OPEN_FRAME = {
  accepts: [
    {
      id: 'farcaster',
      version: 'vNext',
    },
    {
      id: 'xmtp',
      version: 'vNext',
    },
  ],
}

export const URL = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.LOCALHOST

export const PINATA_GATEWAY = `https://aqua-blank-cuckoo-456.mypinata.cloud/ipfs`

// Image Backgrounds
export const MAIN_MENU_BACKGROUND = `${PINATA_GATEWAY}/QmSFHxP8UndrtPU2xyshvEgZHV927SMQvZNYjYMuuoHELE`

export const EMPTY_SCROLL_BACKGROUND = `${PINATA_GATEWAY}/QmfHbKt2wVhADEqJ3KAGjC24JToUM7zJn53yXqvhq2Cu8i`

export const SENT_BOTTLE_BACKGROUND = `${PINATA_GATEWAY}/Qmb7omAjnm5uk28m6Kxe4vc4McpGXtyx5fZbRphvrxzHLg`

export const SEA_BACKGROUND = `${PINATA_GATEWAY}/QmYhrYErZ41ZkCRdzDfP2mfLyzD2uTyKX4AcCn3YCmXxwQ`
export const SEA_BACKGROUND_2 = `${PINATA_GATEWAY}/QmZw8rLNdUHz1ygFNrqZhh1ukUPUfxiSVkS2p57JManM6F`

export const BROKEN_BOTTLE_BACKGROUND = `${PINATA_GATEWAY}/QmakP8Yjt55WJYZMPsJ1SaQDqHiHyncv3nDY9Wk9yn7ynd`
