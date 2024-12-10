/*
  Warnings:

  - The values [ENTRETENIMENTO] on the enum `TagsEvent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TagsEvent_new" AS ENUM ('MUSICA', 'TEATRO', 'COMEDIA', 'PALESTRA');
ALTER TABLE "Event" ALTER COLUMN "tags" TYPE "TagsEvent_new" USING ("tags"::text::"TagsEvent_new");
ALTER TYPE "TagsEvent" RENAME TO "TagsEvent_old";
ALTER TYPE "TagsEvent_new" RENAME TO "TagsEvent";
DROP TYPE "TagsEvent_old";
COMMIT;
