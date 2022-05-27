import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function MenuPlanning() {
  const { date } = useParams();

  return (
    <>
      <Link to={`/menu/${date}`}>back to Menu Details</Link>
      <p>MenuPlanning</p>
    </>
  );
}

export default MenuPlanning;
