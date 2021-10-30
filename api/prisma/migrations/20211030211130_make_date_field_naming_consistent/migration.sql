/*
  Warnings:

  - You are about to drop the column `endsAt` on the `ShoppingList` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `ShoppingList` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "endsAt",
DROP COLUMN "startsAt",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
