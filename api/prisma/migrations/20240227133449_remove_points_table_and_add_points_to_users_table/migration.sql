/*
  Warnings:

  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `points_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `expired_at` DATETIME(3) NULL,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `points`;
