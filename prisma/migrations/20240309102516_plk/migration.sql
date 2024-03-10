/*
  Warnings:

  - Added the required column `adminId` to the `logers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logers" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "logers" ADD CONSTRAINT "logers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
