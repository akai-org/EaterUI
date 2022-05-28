import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useMenuDetails from "@/pages/Menu/hooks/api/useMenuDetails";
import { Button } from "@/components";

function MenuDetails() {
  const { date } = useParams();
  const { data } = useMenuDetails(date);

  return (
    <>
      <Link to="/menu">back to Menu</Link>
      <p>MenuDetails</p>
      <pre style={{ overflow: "scroll" }}>{JSON.stringify(data, null, 2)}</pre>
      <Button to={`/menu/${date}/add`}>Dodaj danie</Button>
    </>
  );
}

export default MenuDetails;
