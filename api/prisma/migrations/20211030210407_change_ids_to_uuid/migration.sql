/*
  Warnings:

  - The primary key for the `MenuItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingListItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingListItemAmount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_shoppingListId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingListItemAmount" DROP CONSTRAINT "ShoppingListItemAmount_shoppingListItemId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MenuItem_id_seq";

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecipeIngredient_id_seq";

-- AlterTable
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShoppingList_id_seq";

-- AlterTable
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shoppingListId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingListItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShoppingListItem_id_seq";

-- AlterTable
ALTER TABLE "ShoppingListItemAmount" DROP CONSTRAINT "ShoppingListItemAmount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shoppingListItemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingListItemAmount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShoppingListItemAmount_id_seq";

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItemAmount" ADD CONSTRAINT "ShoppingListItemAmount_shoppingListItemId_fkey" FOREIGN KEY ("shoppingListItemId") REFERENCES "ShoppingListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
