/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Boot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Boot" ALTER COLUMN "dimensions" SET DATA TYPE TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Boot_code_key" ON "Boot"("code");
