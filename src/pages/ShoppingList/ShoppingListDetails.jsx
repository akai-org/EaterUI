import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { Checkbox, Text, Button, Card } from "@/components";
import styles from "./ShoppingList.module.scss";

function ShoppingListDetails() {
  const params = useParams();
  const text = `Lista zakupów ${params.shopingDetailId}`;

  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          {text}
        </Text>
        <Card
          primaryText={"Marchewka"}
          secondaryText={["4 szt", "0.5 kg"]}
          rightContent={<Checkbox />}
        />
        <Card
          primaryText={"Mąka"}
          secondaryText={"1kg"}
          rightContent={<Checkbox />}
        />
        <Card
          primaryText={"Pomidory"}
          secondaryText={"4 szt"}
          rightContent={<Checkbox />}
        />
      </div>
      <Button
        variant="secondary"
        fullwidth
        to="/shopping-list"
        className={classNames(styles.button)}
      >
        Cofnij
      </Button>
    </>
  );
}

export default ShoppingListDetails;
