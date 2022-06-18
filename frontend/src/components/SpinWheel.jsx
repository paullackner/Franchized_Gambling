import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "10 token" },
  { option: "100 $" },
  { option: "20 token" },
  { option: "200 $" },
  { option: "30 token" },
  { option: "300 $" },
  { option: "40 token" },
  { option: "400 $" },
  { option: "50 token" },
  { option: "500 $" },
];

function SpinWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="grid grid-cols-1 justify-items-center mt-4">
      <h1 className="font-bold text-3xl mb-4 text-center">
        Spin your daily wheel and win great prices!
      </h1>
      <div className="text-center justify-center">
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={["#a80c0c", "#0c0c0c"]}
            textColors={["#e5e5e5"]}
            outerBorderColor="#553322"
            outerBorderWidth={10}
            radiusLineColor="#ffd700"
            radiusLineWidth={2}
            innerBorderWidth={20}
            innerBorderColor="#553322"
            innerRadius={40}
            perpendicularText={true}
            textDistance={75}
            fontSize={18}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
          <button
            className="mt-4 bg-[#00df9a] font-bold rounded-md px-6 py-3"
            onClick={handleSpinClick}
          >
            SPIN
          </button>
        </>
      </div>
    </div>
  );
}

export default SpinWheel;
