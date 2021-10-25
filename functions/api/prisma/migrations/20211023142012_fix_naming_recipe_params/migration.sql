/*
  Warnings:

  - You are about to drop the column `graphics_url` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "graphics_url",
ADD COLUMN     "graphicURL" TEXT;
