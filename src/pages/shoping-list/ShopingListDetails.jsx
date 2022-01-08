import React from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { LinkButton } from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import style from "./ShopingList.module.scss";

function ShopingListDetails() {
  const params = useParams();

  return (
    <div className={classNames(style.container)}>
      <Text size="h3">Listy zakupów params: {params.shopingDetailId}</Text>
      <Text>28 Październik (pon) - 07 Listopad (wt)</Text>
      <div>
        <Text size="h4">Marchewka</Text>
        <ul>
          <li>4 szt.</li>
          <li>0.5 kg</li>
        </ul>
        <Checkbox />
      </div>
      <div>
        <Text size="h4">Mąka</Text>
        <ul>
          <li>1kg</li>
        </ul>
        <Checkbox />
      </div>
      <div>
        <Text size="h4">Pomidory</Text>
        <ul>
          <li>4 szt.</li>
        </ul>
        <Checkbox />
      </div>
      <div>
        <LinkButton type="secondary" fullwidth href="/shoping-list">
          Cofnij
        </LinkButton>
      </div>
    </div>
  );
}

export default ShopingListDetails;
