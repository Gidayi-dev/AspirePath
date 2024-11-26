/*
  Warnings:

  - You are about to drop the column `companyDescription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "companyDescription",
DROP COLUMN "companyName",
DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
