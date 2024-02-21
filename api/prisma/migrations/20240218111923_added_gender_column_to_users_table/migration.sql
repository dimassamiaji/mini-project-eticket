-- AlterTable
ALTER TABLE `users` ADD COLUMN `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male';
