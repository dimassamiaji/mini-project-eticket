/*
  Warnings:

  - You are about to alter the column `price` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `price` DECIMAL(18, 2) NOT NULL;
