import React, { useState } from "react";
import classNames from "classnames";
import { Text, Button, Input } from "@/components";
import { useNavigate } from "react-router";
import styles from "./ShoppingList.module.scss";
import useCreateShoppingList from "./hooks/api/useCreateShoppingList";

function ShoppingListAdd() {
  const [minDate, setMin] = useState("");
  const [maxDate, setMax] = useState("");

  const { mutate, isLoading } = useCreateShoppingList();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/shopping-list");
      },
    });
  };

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
          max={maxDate}
          onChange={(event) => {
            setMin(event.target.value);
          }}
        />
        <Input
          label={"Data końcowa"}
          type="date"
          className={classNames(styles.input)}
          min={minDate}
          onChange={(event) => setMax(event.target.value)}
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
          onClick={() => {
            handleSubmit({ startDate: minDate, endDate: maxDate });
          }}
          isDisabled={isLoading}
          className={classNames(styles.instance)}
        >
          Generuj
        </Button>
      </div>
    </>
  );
}

export default ShoppingListAdd;
