/*
  Warnings:

  - A unique constraint covering the columns `[invoice_no]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `invoice_no` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_invoice_no_key` ON `transactions`(`invoice_no`);
