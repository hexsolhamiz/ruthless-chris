/*
  Warnings:

  - Added the required column `updatedAt` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'banner',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
