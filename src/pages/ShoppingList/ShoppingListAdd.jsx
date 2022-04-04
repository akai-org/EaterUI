import React from "react";
import classNames from "classnames";
import { Text, Button, Input } from "@/components";
import styles from "./ShoppingList.module.scss";

function ShoppingListAdd() {
  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          Dodaj listę zakupów
        </Text>
        <Input
          label={"Data początkowa"}
          type="date"
          className={classNames(styles.input)}
        />
        <Input
          label={"Data końcowa"}
          type="date"
          className={classNames(styles.input)}
        />
      </div>
      <div className={classNames(styles.button, styles["button--multiple"])}>
        <Button
          variant="secondary"
          to="/shopping-list"
          className={classNames(styles.instance)}
        >
          Cofnij
        </Button>

        <Button
          type="primary"
          to="/shopping-list/1"
          className={classNames(styles.instance)}
        >
          Generuj
        </Button>
      </div>
    </>
  );
}

export default ShoppingListAdd;
