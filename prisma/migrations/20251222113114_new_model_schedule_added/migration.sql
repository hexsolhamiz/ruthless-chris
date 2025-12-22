-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);
