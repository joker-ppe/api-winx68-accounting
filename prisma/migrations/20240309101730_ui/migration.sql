/*
  Warnings:

  - Added the required column `bankAccountId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "bankAccountId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "logers" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "bankAccounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
