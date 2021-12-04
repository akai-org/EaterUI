import React from "react";
import { LinkButton } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";

function ShopingList() {
  return (
    <>
      <Text size="h1">Listy zakupów</Text>
      <div>
        <Text size="h3">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>
      <div>
        <Text size="h3">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>

      <LinkButton type="primary" fullwidth href="/shoping-list/add">
        Dodaj listę zakupów
      </LinkButton>
    </>
  );
}

export default ShopingList;
