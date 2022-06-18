import React, { useState } from "react";
import "./CoinFlip.css";

function CoinFlip() {
  const [side, setSide] = useState("");

  return (
    <div className="flex flex-col mt-20">
      <div id="coin" className={side}>
        <div class="side-a">
        </div>
        <div class="side-b">
        </div>
      </div>
      <button
        className="mt-10 bg-[#00df9a] font-bold rounded-md px-6 py-3"
        onClick={() => {
          setSide("heads");
        }}
      >
        flip
      </button>
    </div>
  );
}

export default CoinFlip;
