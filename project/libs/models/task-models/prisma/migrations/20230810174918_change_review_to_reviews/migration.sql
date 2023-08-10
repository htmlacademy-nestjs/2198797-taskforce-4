/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_taskId_fkey";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_taskId_key" ON "reviews"("taskId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
