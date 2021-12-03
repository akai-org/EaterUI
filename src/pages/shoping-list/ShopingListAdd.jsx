import React from "react";
import { LinkButton } from "../../components/Button/Button";

function ShopingListAdd() {
  return (
    <>
      <h1>Dodaj listę zakupów</h1>
      <div>
        <label htmlFor="shoping-date-start">Data początkowa</label>
        <input type="date" name="shoping-date-start" id="shoping-date-start" />

        <label htmlFor="shoping-date-start">Data końcowa</label>
        <input type="date" name="shoping-date-end" id="shoping-date-end" />
      </div>
      <div>
        <h3>28 Paź (pon) - 07 Lis (wt)</h3>
        <p>888 Produktów</p>
      </div>

      <LinkButton type="secondary" href="/shoping-list">
        Cofnij
      </LinkButton>

      <LinkButton type="primary" href="/shoping-list/:1">
        Generuj
      </LinkButton>
    </>
  );
}

export default ShopingListAdd;
