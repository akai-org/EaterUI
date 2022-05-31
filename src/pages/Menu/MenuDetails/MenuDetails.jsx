import React from "react";
import { useParams } from "react-router";
import useMenuDetails from "@/pages/Menu/hooks/api/useMenuDetails";
import { Button, ButtonGroup, Card, Text } from "@/components";

function getTitleText(stringDate) {
  const date = new Date(stringDate);
  const dayMonth = date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
  });
  const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" });

  return `${dayMonth} (${weekday})`;
}

function MenuDetails() {
  const { date } = useParams();
  const { data = [] } = useMenuDetails(date);

  return (
    <>
      <Text size="h3">{getTitleText(date)}</Text>
      {data.map(({ id, recipe, portions }) => (
        <Card
          key={id}
          primaryText={recipe.name}
          secondaryText={`Zaplanowane porcje - ${portions}`}
        />
      ))}
      <Button to={`/menu/${date}/add`}>Dodaj danie</Button>
      <ButtonGroup>
        <Button variant="secondary" fullwidth to="/menu">
          Cofnij
        </Button>
      </ButtonGroup>
    </>
  );
}

export default MenuDetails;
