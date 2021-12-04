import React from "react";
import { LinkButton } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";

function ShopingListAdd() {
  return (
    <>
      <Text size="h1">Dodaj listę zakupów</Text>
      <div>
        <label htmlFor="shoping-date-start">Data początkowa</label>
        <input type="date" name="shoping-date-start" id="shoping-date-start" />

        <label htmlFor="shoping-date-start">Data końcowa</label>
        <input type="date" name="shoping-date-end" id="shoping-date-end" />
      </div>
      <div>
        <Text size="h3">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>

      <LinkButton type="secondary" href="/shoping-list">
        Cofnij
      </LinkButton>

      <LinkButton type="primary" href="/shoping-list/1">
        Generuj
      </LinkButton>
    </>
  );
}

export default ShopingListAdd;
