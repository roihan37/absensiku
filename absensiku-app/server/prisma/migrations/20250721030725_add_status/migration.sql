/*
  Warnings:

  - You are about to drop the column `status` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
