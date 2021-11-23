import React, { useState } from "react";

function RecipeCreation() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <div>Create</div>
      <button onClick={() => setShowOverlay(true)}>smutny button</button>
      {showOverlay && (
        <div>
          <p>elo, jestem overlay</p>
          <button onClick={() => setShowOverlay(false)}>radosny button</button>
        </div>
      )}
    </>
  );
}

export default RecipeCreation;
