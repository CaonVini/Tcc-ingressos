/*
  Warnings:

  - Added the required column `localEvent` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TagsEvent" AS ENUM ('MUSICA', 'ENTRETENIMENTO', 'COMEDIA', 'PALESTRA');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "localEvent" TEXT NOT NULL,
ADD COLUMN     "tags" "TagsEvent" NOT NULL;
