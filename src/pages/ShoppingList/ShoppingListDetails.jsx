import React, { useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { Checkbox, Text, Button, Card } from "@/components";
import styles from "./ShoppingList.module.scss";
import useShoppingListDetails from "./hooks/api/useShoppingListDetails";
import useMarkShoppingListDetail from "./hooks/api/useMarkShoppingListDetail";

function ShoppingListDetails() {
  const [checked, setChecked] = useState(new Array(4).fill(false));
  const { mutate } = useMarkShoppingListDetail();
  const params = useParams();
  const text = `Lista zakupów ${params.shopingDetailId}`;

  const state = useShoppingListDetails(params.shopingDetailId);
  console.log(state);

  if (state.isLoading) return <p>Loading...</p>;

  if (state.isError) return <p>Error: {state.error.toString()}</p>;

  function makeMeasureText(arr) {
    return arr.map((el) => `${el.amount} ${el.measure}`);
  }

  const handleCheck = async (position) => {
    const newState = checked.map((el, index) =>
      index === position ? !el : el,
    );
    const data = {
      mealId: params.shopingDetailId,
      ingredientId: state.data.ingredients[position].id,
    };
    console.log(data);
    // setChecked(newState);
    mutate(data, {
      onSuccess: () => {
        setChecked(newState);
      },
      onError: () => {
        console.log("coś nie działa");
      },
    });
  };

  // setChecked(state.data.ingredients.map((el) => el.marked));

  // const temp = state.data.ingredients.map((el) => el.marked);
  // console.log(temp);

  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          {text}
        </Text>
        {state.data.ingredients.map((el, index) => {
          const measureText = makeMeasureText(el.amounts);

          return (
            <Card
              primaryText={el.name}
              secondaryText={
                measureText.length <= 1 ? measureText[0] : measureText
              }
              rightContent={
                <Checkbox
                  checked={checked[index]}
                  onChange={() => handleCheck(index)}
                />
              }
              key={el.id}
            />
          );
        })}
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
