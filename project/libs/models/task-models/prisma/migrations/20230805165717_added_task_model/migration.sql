/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "tasks" (
    "post_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL DEFAULT '',
    "adress" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "city" TEXT NOT NULL DEFAULT '',
    "user_id" TEXT NOT NULL DEFAULT 'new',
    "userId" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("post_id")
);
