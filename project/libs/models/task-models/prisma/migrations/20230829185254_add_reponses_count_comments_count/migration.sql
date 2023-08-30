-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "comments_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "responses_count" INTEGER NOT NULL DEFAULT 0;
