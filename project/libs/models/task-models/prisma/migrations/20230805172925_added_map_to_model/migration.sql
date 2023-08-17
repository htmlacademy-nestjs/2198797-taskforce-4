/*
  Warnings:

  - You are about to drop the column `taskId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "taskId",
ADD COLUMN     "task_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
