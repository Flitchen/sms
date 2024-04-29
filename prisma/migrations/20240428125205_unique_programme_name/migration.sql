/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `programme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `programme_name_key` ON `programme`(`name`);
