import React, { useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames";
import { Text, Button, Input } from "@/components";
import { showErrorToast } from "@/utils/toast";
import styles from "./ShoppingList.module.scss";
import useCreateShoppingList from "./hooks/api/useCreateShoppingList";

function ShoppingListAdd() {
  const [minDate, setMin] = useState("");
  const [maxDate, setMax] = useState("");

  const { mutate, isLoading } = useCreateShoppingList();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const tempStart = new Date(data.startDate);
    const tempEnd = new Date(data.endDate);
    if (tempStart.getTime() > tempEnd.getTime()) {
      showErrorToast("Niepoprawny przedział dat");
    } else {
      mutate(data, {
        onSuccess: () => {
          navigate("/shopping-list");
        },
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Text size="h3" className={styles.header}>
          Dodaj listę zakupów
        </Text>
        <Input
          label="Data początkowa"
          type="date"
          wrapperClassName={styles.input}
          max={maxDate}
          onChange={(event) => setMin(event.target.value)}
        />
        <Input
          label="Data końcowa"
          type="date"
          wrapperClassName={styles.input}
          min={minDate}
          onChange={(event) => setMax(event.target.value)}
        />
      </div>
      <div className={classNames(styles.submit, styles.submitMultiple)}>
        <Button
          variant="secondary"
          to="/shopping-list"
          className={styles.instanceButton}
        >
          Cofnij
        </Button>

        <Button
          type="primary"
          onClick={() => {
            handleSubmit({ startDate: minDate, endDate: maxDate });
          }}
          isDisabled={isLoading}
          className={styles.instanceButton}
        >
          Generuj
        </Button>
      </div>
    </>
  );
}

export default ShoppingListAdd;
