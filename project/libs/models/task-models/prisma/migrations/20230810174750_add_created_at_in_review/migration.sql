/*
  Warnings:

  - You are about to alter the column `price` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
