/*
  Warnings:

  - You are about to drop the column `userId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "executorId" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_taskId_key" ON "Review"("taskId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
