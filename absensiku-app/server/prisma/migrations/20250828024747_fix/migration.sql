/*
  Warnings:

  - You are about to drop the `Duty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Duty" DROP CONSTRAINT "Duty_userId_fkey";

-- DropTable
DROP TABLE "Duty";
