/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Boot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Boot_name_key" ON "Boot"("name");
