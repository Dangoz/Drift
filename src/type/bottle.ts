export type Bottle = {
  id: string
  authorFID: number
  replierFID: number | null
  message: string
  reply: string | null
  createdAt: Date
  repliedAt: Date | null
  isActive: boolean
}
