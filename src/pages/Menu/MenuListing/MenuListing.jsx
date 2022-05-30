import React from "react";
import { Link } from "react-router-dom";
import useMenu from "../hooks/api/useMenu";

function MenuListing() {
  const { data = [] } = useMenu({
    startDate: "2022-04-01",
    endDate: "2022-04-07",
  });

  return (
    <>
      <p>MenuListing</p>
      {data.map(({ date }) => (
        <Link key={date} to={`/menu/${date}`}>
          {date}
        </Link>
      ))}
    </>
  );
}

export default MenuListing;
