/*
  Warnings:

  - You are about to drop the column `nisn` on the `Class` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RefreshToken_id_key";

-- DropIndex
DROP INDEX "RefreshToken_userId_key";

-- DropIndex
DROP INDEX "Student_classId_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "nisn";

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "device" TEXT,
ADD COLUMN     "ip" TEXT;
