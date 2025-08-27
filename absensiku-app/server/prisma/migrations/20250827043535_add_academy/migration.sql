/*
  Warnings:

  - A unique constraint covering the columns `[endDate]` on the table `AcademicYear` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `AcademicYear` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicYear" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_endDate_key" ON "AcademicYear"("endDate");
