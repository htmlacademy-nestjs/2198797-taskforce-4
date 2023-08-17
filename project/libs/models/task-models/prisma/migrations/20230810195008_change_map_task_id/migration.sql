/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_task_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_taskId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "post_id",
ADD COLUMN     "task_id" SERIAL NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
