import React from "react";
import classNames from "classnames";
import { Button, Text, Card } from "@/components";
import { Link } from "react-router-dom";
import styles from "./ShoppingList.module.scss";
import useShoppingList from "./hooks/api/useShoppingList";

function getDateString(date) {
  const month = date.toLocaleDateString("pl-PL", { month: "short" });
  const day = date.toLocaleDateString("pl-PL", { day: "2-digit" });
  const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" });

  return `${day} ${
    month.charAt(0).toUpperCase() + month.slice(1)
  } (${weekday.slice(0, -1)})`;
}

function ShoppingList() {
  const state = useShoppingList();

  if (state.isLoading) return <p>Loading...</p>;

  if (state.isError) return <p>Error: {state.error.toString()}</p>;

  return (
    <>
      <div className={classNames(styles.container)}>
        <Text size="h3" className={classNames(styles.header)}>
          Listy zakupów
        </Text>
        {state.data.map((el) => {
          const startDate = new Date(el.startDate);
          const endDate = new Date(el.endDate);

          return (
            <Link
              to={`/shopping-list/${el.id}`}
              key={el.id}
              className={classNames(styles.a)}
            >
              <Card
                primaryText={`${getDateString(startDate)} - ${getDateString(
                  endDate,
                )}`}
                secondaryText={
                  !el.markedIngredients
                    ? `${el.ingredients} Produktów`
                    : `${el.markedIngredients}/${el.ingredients} produktów zakupionych`
                }
              />
            </Link>
          );
        })}
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
