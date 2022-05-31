import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Card } from "@/components";
import useMenu from "../hooks/api/useMenu";
import styles from "./MenuListing.module.scss";
import { displayDateFormat, dateFormat } from "@/utils/date";

function MenuListing() {
  const menuDaysBack = 2;
  const menuDaysAhead = 7;
  const startRequestDate = dayjs().add(-menuDaysBack, "day").format(dateFormat);
  const endRequestDate = dayjs().add(menuDaysAhead, "day").format(dateFormat);

  const { data = [] } = useMenu(startRequestDate, endRequestDate);

  return (
    <>
      <h1>Twój jadłospis</h1>
      <section className={styles.menuContainer}>
        {data.map(({ date, count }) => {
          const formatedDate = dayjs(date).format(displayDateFormat);

          let correctMealWordVariant = "";

          switch (count) {
            case 1:
              correctMealWordVariant = "posiłek";
              break;
            case 2:
            case 3:
            case 4:
              correctMealWordVariant = "posiłki";
              break;
            default:
              correctMealWordVariant = "posiłków";
          }
          return (
            <Link
              className={styles.cardContainer}
              key={date}
              to={`/menu/${date}`}
            >
              <Card
                primaryText={formatedDate}
                secondaryText={
                  count === 0
                    ? "Nie masz jeszcze zaplanowanych posiłków"
                    : `Zaplanowano ${count} ${correctMealWordVariant}`
                }
              />
            </Link>
          );
        })}
      </section>
    </>
  );
}

export default MenuListing;
