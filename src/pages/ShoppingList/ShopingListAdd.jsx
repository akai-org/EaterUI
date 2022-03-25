import React from "react";
import classNames from "classnames";
import { Text, LinkButton } from "@/components";
import style from "./ShoppingList.module.scss";

function ShopingListAdd() {
  return (
    <div className={classNames(style.container)}>
      <Text size="h3">Dodaj listę zakupów</Text>
      <div>
        <label htmlFor="shoping-date-start">Data początkowa</label>
        <input type="date" name="shoping-date-start" id="shoping-date-start" />

        <label htmlFor="shoping-date-start">Data końcowa</label>
        <input type="date" name="shoping-date-end" id="shoping-date-end" />
      </div>
      <div>
        <Text size="h4">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>
      <div>
        <LinkButton type="secondary" href="/shoping-list">
          Cofnij
        </LinkButton>

        <LinkButton type="primary" href="/shoping-list/1">
          Generuj
        </LinkButton>
      </div>
    </div>
  );
}

export default ShopingListAdd;
