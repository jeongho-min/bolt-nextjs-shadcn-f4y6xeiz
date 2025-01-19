-- AlterTable
ALTER TABLE "price_categories" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "price_categories" ADD CONSTRAINT "price_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "price_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
