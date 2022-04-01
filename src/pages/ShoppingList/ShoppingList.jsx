import React from "react";
import classNames from "classnames";
import { Button, Text, Card } from "@/components";
import styles from "./ShoppingList.module.scss";

function ShoppingList() {
  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          Listy zakupów
        </Text>
        <Card
          primaryText={"28 Paź (pon) - 07 Lis (wt)"}
          secondaryText={"888 Produktów"}
        />
        <Card
          primaryText={"28 Paź (pon) - 07 Lis (wt)"}
          secondaryText={"12/16 produktów zakupionych"}
        />
        <Card
          disabled
          primaryText={"28 Paź (pon) - 07 Lis (wt)"}
          secondaryText={"888 Produktów"}
        />
      </div>
      <Button
        type="primary"
        fullwidth
        to="/shopping-list/add"
        className={classNames(styles.button)}
      >
        Dodaj listę zakupów
      </Button>
    </>
  );
}

export default ShoppingList;
