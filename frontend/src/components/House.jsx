import React from "react";
import CoinFlip from "./house-games/CoinFlip";


function House() {
  

  return (
    <div className="grid grid-cols-1 justify-items-center mt-4 min-h-[500px]">
      <CoinFlip/>
    </div>
  );
}

export default House;
