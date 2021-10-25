/*
  Warnings:

  - Added the required column `marked` to the `ShoppingListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShoppingListItem" ADD COLUMN     "marked" BOOLEAN NOT NULL;
