-- CreateTable
CREATE TABLE "Task" (
    "taskId" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL DEFAULT '',
    "adress" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "city" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'new',
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId")
);
