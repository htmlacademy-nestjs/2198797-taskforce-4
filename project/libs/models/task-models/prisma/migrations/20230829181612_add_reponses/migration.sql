/*
  Warnings:

  - The `responses` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "responses",
ADD COLUMN     "responses" TEXT[];
