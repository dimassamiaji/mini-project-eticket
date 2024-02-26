/*
  Warnings:

  - Added the required column `description` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotions` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `isReferral` BOOLEAN NOT NULL DEFAULT false;
