-- CreateTable
CREATE TABLE "ResearchDetails" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResearchDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResearchDetails" ADD CONSTRAINT "ResearchDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
