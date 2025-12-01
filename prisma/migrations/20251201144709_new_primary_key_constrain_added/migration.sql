-- AlterTable
ALTER TABLE "liveStream" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "liveStream_pkey" PRIMARY KEY ("id");
