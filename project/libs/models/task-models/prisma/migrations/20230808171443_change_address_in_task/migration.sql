/*
  Warnings:

  - You are about to drop the column `adress` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT '';
