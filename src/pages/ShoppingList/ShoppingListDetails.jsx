import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Checkbox, Text, Button, Card } from "@/components";
import { showErrorToast } from "@/utils/toast";
import styles from "./ShoppingList.module.scss";
import useShoppingListDetails from "./hooks/api/useShoppingListDetails";
import useMarkShoppingListDetail from "./hooks/api/useMarkShoppingListDetail";

function ShoppingListDetails() {
  const { shopingDetailId } = useParams();
  const [checked, setChecked] = useState();
  const { mutate } = useMarkShoppingListDetail();
  const { data, isLoading, isError, error } =
    useShoppingListDetails(shopingDetailId);

  useEffect(() => {
    const temp = data?.ingredients?.map((el) => el.marked);
    if (temp) setChecked(temp);
  }, [data]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.toString()}</p>;

  function makeMeasureText(arr) {
    return arr.map((el) => `${el.amount} ${el.measure}`);
  }

  const handleCheck = async (position) => {
    const newState = checked.map((el, index) =>
      index === position ? !el : el,
    );
    const ingredientData = {
      mealId: shopingDetailId,
      ingredientId: data.ingredients[position].id,
      shoppingRequest: { marked: !checked[position] },
    };

    mutate(ingredientData, {
      onSuccess: () => {
        setChecked(newState);
      },
      onError: () => {
        showErrorToast("Nie można zaznaczyć tego produktu");
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <Text size="h3" className={styles.header}>
          Lista zakupów
        </Text>
        {data?.ingredients?.map((el, index) => {
          const measureText = makeMeasureText(el.amounts);
          return (
            <Card
              primaryText={el.name}
              secondaryText={
                measureText.length <= 1 ? measureText[0] : measureText
              }
              rightContent={
                <Checkbox
                  checked={checked === undefined ? false : checked[index]}
                  onChange={() => handleCheck(index)}
                />
              }
              key={el.id}
            />
          );
        })}
      </div>
      <Button
        variant="secondary"
        fullwidth
        to="/shopping-list"
        className={styles.submit}
      >
        Cofnij
      </Button>
    </>
  );
}

export default ShoppingListDetails;
