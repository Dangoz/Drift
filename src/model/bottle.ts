import prisma from './prismaClient'
import { timestampToHumanReadable } from '@/common/time'

export const createBottle = async (fid: number, message: string, timestamp: number) => {
  const bottle = await prisma.bottle.create({
    data: {
      authorFID: fid,
      message,
      createdAt: timestampToHumanReadable(timestamp),
    },
  })
  return bottle
}
