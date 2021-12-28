import React from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components";

function ShoPpingListDetails() {
  const params = useParams();

  return (
    <>
      <h1>Listy zakupów params: {params.shopingDetailId}</h1>
      <p>28 Październik (pon) - 07 Listopad (wt)</p>
      <div>
        <h3>Marchewka</h3>
        <ul>
          <li>4 szt.</li>
          <li>0.5 kg</li>
        </ul>
        <Checkbox />
      </div>
      <div>
        <h3>Mąka</h3>
        <ul>
          <li>1kg</li>
        </ul>
        <Checkbox />
      </div>
      <div>
        <h3>Pomidory</h3>
        <ul>
          <li>4 szt.</li>
        </ul>
        <Checkbox />
      </div>
    </>
  );
}

export default ShoPpingListDetails;
