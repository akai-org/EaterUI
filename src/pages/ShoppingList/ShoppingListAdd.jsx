import React from "react";
import classNames from "classnames";
import { Text, Button } from "@/components";
import styles from "./ShoppingList.module.scss";

function ShoppingListAdd() {
  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          Dodaj listę zakupów
        </Text>
        <div>
          <label htmlFor="shoping-date-start">Data początkowa</label>
          <input
            type="date"
            name="shoping-date-start"
            id="shoping-date-start"
          />

          <label htmlFor="shoping-date-start">Data końcowa</label>
          <input type="date" name="shoping-date-end" id="shoping-date-end" />
        </div>
        <div>
          <Text size="h4">28 Paź (pon) - 07 Lis (wt)</Text>
          <Text>888 Produktów</Text>
        </div>
      </div>
      <div className={classNames(styles.button, styles.buttonMultiple)}>
        <Button
          variant="secondary"
          to="/shopping-list"
          className={classNames(styles.buttonMultipleInstance)}
        >
          Cofnij
        </Button>

        <Button
          type="primary"
          to="/shopping-list/1"
          className={classNames(styles.buttonMultipleInstance)}
        >
          Generuj
        </Button>
      </div>
    </>
  );
}

export default ShoppingListAdd;
