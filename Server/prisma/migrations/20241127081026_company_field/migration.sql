/*
  Warnings:

  - Added the required column `company` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "company" TEXT NOT NULL;
