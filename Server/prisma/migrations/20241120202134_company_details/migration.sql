/*
  Warnings:

  - Added the required column `companyDescription` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyDescription" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL;
