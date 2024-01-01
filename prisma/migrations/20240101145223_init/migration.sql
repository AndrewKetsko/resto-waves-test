-- CreateTable
CREATE TABLE "Boot" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dimensions" INTEGER[],

    CONSTRAINT "Boot_pkey" PRIMARY KEY ("id")
);
