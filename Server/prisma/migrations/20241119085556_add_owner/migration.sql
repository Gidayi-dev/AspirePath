/*
  Warnings:

  - You are about to drop the column `userId` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `owner` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "userId",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
