/*
  Warnings:

  - Made the column `status` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GroupShift" AS ENUM ('MORNING', 'EVENING');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "shift" "GroupShift" NOT NULL DEFAULT 'MORNING';

-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "start_time" SET DATA TYPE TIME,
ALTER COLUMN "end_time" SET DATA TYPE TIME,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PLANNED';
