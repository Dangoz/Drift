import prisma from './prismaClient'
import { timestampToHumanReadable } from '@/common/time'
import type { Bottle } from '@/type/bottle'

export const createBottle = async (fid: number, message: string, timestamp: number): Promise<Bottle> => {
  const bottle = await prisma.bottle.create({
    data: {
      authorFID: fid,
      message,
      createdAt: timestampToHumanReadable(timestamp),
    },
  })
  return bottle
}

// get a random bottle (that is active)
export const getRandomBottle = async (): Promise<Bottle> => {
  const activeBottlesCount = await prisma.bottle.count({
    where: {
      isActive: true,
    },
  })
  const skip = Math.floor(Math.random() * activeBottlesCount)
  const bottles = await prisma.bottle.findMany({
    skip,
    take: 1,
    where: {
      isActive: true,
    },
  })

  return bottles[0]
}
