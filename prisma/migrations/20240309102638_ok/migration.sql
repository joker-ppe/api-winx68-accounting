/*
  Warnings:

  - Added the required column `router` to the `logers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logers" ADD COLUMN     "params" TEXT,
ADD COLUMN     "router" TEXT NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
