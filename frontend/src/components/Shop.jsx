import React, { useState } from "react";

export default function Shop() {
    const [token, setToken] = useState(100);
    const [cost, setCost] = useState([0, 0, 0, 0]);

    const buyUpgrade = (id) => {
        if (token > cost[0]) {
            setToken(token - 10);
        } else {
            let b = document.getElementsByTagName('button')[id];
            b.style.backgroundColor = 'red'
        }
    }

  return (
    <div className="w-full py-[10rem] px-4 bg-white">
        <h1 className="text-center text-5xl">Token: {token}</h1>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-[#01283f] w-full  shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <p className="text-center text-5xl">📶</p>
          <h2 className="text-4xl font-bold text-center py-8">
            Better Internet
          </h2>
          <p className="text-center text-2xl font-bold">
            Increased customer satisfaction. <br /> Directly leads to 10% more income.
          </p>
          <button onClick={() => buyUpgrade(0)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
            Buy: {cost[0]}
          </button>
        </div>
        
        <div className="bg-[#01283f] w-full  shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <p className="text-center text-5xl">🔆</p>
          <h2 className="text-4xl font-bold text-center py-8">
            Better Lights
          </h2>
          <p className="text-center text-2xl font-bold">
            Makes customers forget the time of day. <br /> Directly leads to 5% more income.
          </p>
          <button onClick={() => buyUpgrade(1)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
            Buy: {cost[1]}
          </button>
        </div>
        
        <div className="bg-[#01283f] w-full  shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <p className="text-center text-5xl">🦺</p>
          <h2 className="text-4xl font-bold text-center py-8">
            Skilled Construction Workers
          </h2>
          <p className="text-center text-2xl font-bold">
            Skilled construction workers make upgrading your buildings cheaper. <br /> Upgrading costs 10% less.
          </p>
          <button onClick={() => buyUpgrade(2)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
            Buy: {cost[2]}
          </button>
        </div>
        
        <div className="bg-[#01283f] w-full  shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <p className="text-center text-5xl">🛗</p>
          <h2 className="text-4xl font-bold text-center py-8">
            More Efficient Elevators
          </h2>
          <p className="text-center text-2xl font-bold">
            Elevators need to be efficient to make our casino hight more scaleable.<br /> Upgrading costs 5% less.
          </p>
          <button onClick={() => buyUpgrade(3)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
            Buy: {cost[3]}
          </button>
        </div>
        
      </div>
    </div>
  );
}
