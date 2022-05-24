import React from "react";
import { Link } from "react-router-dom";
import useMenu from "../hooks/api/useMenu";

function MenuListing() {
  const { data = [] } = useMenu();

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
