/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Made the column `start_date` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "start_date" SET NOT NULL,
ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "end_date" SET NOT NULL,
ALTER COLUMN "end_date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "groups"("name");
