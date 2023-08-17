/*
  Warnings:

  - You are about to drop the column `creatorId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `executorId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_taskId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "creatorId",
DROP COLUMN "executorId",
DROP COLUMN "user_id",
ADD COLUMN     "creator_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "executor_id" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'new';

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
