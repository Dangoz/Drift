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

// get a random bottle (that is active) not written by the user
export const getRandomBottle = async (userId: number): Promise<Bottle | null> => {
  const activeBottlesCount = await prisma.bottle.count({
    where: {
      AND: [
        {
          isActive: true,
        },
        {
          NOT: {
            authorFID: userId,
          },
        },
      ],
    },
  })
  // if there are no active bottles, return null
  console.log('activeBottlesCount', activeBottlesCount)
  if (activeBottlesCount === 0) {
    return null
  }

  const skip = Math.floor(Math.random() * activeBottlesCount)
  const bottles = await prisma.bottle.findMany({
    skip,
    take: 1,
    where: {
      isActive: true,
      NOT: {
        authorFID: userId,
      },
    },
  })

  return bottles[0]
}

// reply to a bottle
export const replyToBottle = async (
  id: string,
  replierFID: number,
  reply: string,
  timestamp: number,
): Promise<Bottle> => {
  const bottle = await prisma.bottle.update({
    where: {
      id,
    },
    data: {
      replierFID,
      reply,
      repliedAt: timestampToHumanReadable(timestamp),
      isActive: false,
    },
  })
  return bottle
}

export const getSealedBottles = async (userId: number): Promise<Bottle[]> => {
  const bottles = await prisma.bottle.findMany({
    where: {
      AND: [
        {
          isActive: false,
        },
        {
          OR: [{ authorFID: userId }, { replierFID: userId }],
        },
      ],
    },
  })
  return bottles
}
