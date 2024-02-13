-- AlterTable
ALTER TABLE `Post` ADD COLUMN `archivedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `favoritedAt` DATETIME(3) NULL;
