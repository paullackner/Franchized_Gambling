import axios from "axios";
import React, { useState } from "react";
import "./CoinFlip.css";

function CoinFlip() {
  const [side, setSide] = useState("");

  const flipCoin = (bet, side) => {
    axios.get("/games/flip", { params: { bet: bet } }).then((response) => {
      console.log(response.data.win);
      if (response.data.amount === 0) {
        let b = document.getElementsByTagName('button')[0];
        b.style.backgroundColor = 'red';
        return;
      }

      setSide('flipme');
      setSide((side === response.data.win) ? "heads" : "tails");
    });
  }

  return (
    <div className="flex flex-col mt-20">
      <div id="coin" className={side}>
        <div class="side-a">
        </div>
        <div class="side-b">
        </div>
      </div>
      <div className="flex justify-center content-center mt-5">
        <button
          className="bg-[#00df9a] font-bold rounded-md px-6 py-3"
          onClick={() => {
            flipCoin(10, true);
          }}
        >
          Heads
        </button>
        <p className="text-3xl ml-3 mr-3">Bet 10 Tokens</p>
        <button
          className="bg-[#00df9a] font-bold rounded-md px-6 py-3"
          onClick={() => {
            flipCoin(10, false);
          }}
        >
          Tails
        </button>
      </div>
    </div>
  );
}

export default CoinFlip;
