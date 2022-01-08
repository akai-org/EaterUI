import React from "react";
import classNames from "classnames";
import { LinkButton } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import style from "./ShopingList.module.scss";

function ShopingList() {
  return (
    <div className={classNames(style.container)}>
      <Text size="h3">Listy zakupów</Text>
      <div>
        <Text size="h4">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>
      <div>
        <Text size="h4">28 Paź (pon) - 07 Lis (wt)</Text>
        <Text>888 Produktów</Text>
      </div>
      <div>
        <LinkButton type="primary" fullwidth href="/shoping-list/add">
          Dodaj listę zakupów
        </LinkButton>
      </div>
    </div>
  );
}

export default ShopingList;
