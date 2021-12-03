import React from "react";
import { LinkButton } from "../../components/Button/Button";

function ShopingList() {
  return (
    <>
      <h1>Listy zakupów</h1>
      <div>
        <h3>28 Paź (pon) - 07 Lis (wt)</h3>
        <p>888 Produktów</p>
      </div>
      <div>
        <h3>28 Paź (pon) - 07 Lis (wt)</h3>
        <p>888 Produktów</p>
      </div>

      <LinkButton type="primary" fullwidth href="/shoping-list/add">
        Dodaj listę zakupów
      </LinkButton>
    </>
  );
}

export default ShopingList;
