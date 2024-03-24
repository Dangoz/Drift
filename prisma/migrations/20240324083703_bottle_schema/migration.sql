-- CreateTable
CREATE TABLE "Bottle" (
    "id" TEXT NOT NULL,
    "authorFID" INTEGER NOT NULL,
    "replierFID" INTEGER,
    "message" TEXT NOT NULL,
    "reply" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "repliedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);
