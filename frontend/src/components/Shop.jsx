import React, { useState } from "react";
import axios from "axios";

export default class Shop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 0,
      money: 0,
      amount: [0, 0, 0, 0],
      cost: [0, 0, 0, 0],
    }
    this.getData();
  }

  getData() {
    axios.get('/shop/costs').then((response) => {
      this.setState({
        amount: response.data.upgrades,
        cost: response.data.costs
      });
    });

    axios.get('/user/info').then((response) => {
      this.setState({ token: response.data.token, money: response.data.money });
    });
  }

  buyUpgrade(id) {
    axios.get('/shop/buy', { params: { number: id + 1 } }).then((response) => {
      if (response.data.number < 0) {
        let b = document.getElementsByTagName('button')[id + 1];
        b.style.backgroundColor = 'red'
      } else {
        this.getData();
      }
    });
  }

  buyToken() {
    axios.get('/shop/token').then((response) => {
      if (!response.data.success) {
        let b = document.getElementsByTagName('button')[0];
        b.style.backgroundColor = 'red'
      } else {
        this.getData();
      }
    });
  }

  render() {

    return (
      <div className="w-full py-[10rem] px-4 bg-white">
        <div className="mb-5 flex justify-center conten-center gap-10">
          <div>
            <h1 className="text-center text-5xl">Token: {this.state.token}</h1>
            <h1 className="text-center text-5xl">Money: {this.state.money}</h1>
          </div>
            <button onClick={() => this.buyToken()} className="bg-[#00df9a] justify-center rounded-md font-medium my-6 px-6 py-3">
              Buy Token 10 token = 1000$
            </button>
        </div>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[#01283f] w-full  shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <p className="text-center text-5xl">📶</p>
            <h2 className="text-4xl font-bold text-center py-8">
              Better Internet
            </h2>
            <p className="text-center text-2xl font-bold">
              Increased customer satisfaction. <br /> Directly leads to 10% more income.
            </p>
            <button onClick={() => this.buyUpgrade(0)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
              Buy: {this.state.cost[0]}
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
            <button onClick={() => this.buyUpgrade(1)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
              Buy: {this.state.cost[1]}
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
            <button onClick={() => this.buyUpgrade(2)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
              Buy: {this.state.cost[2]}
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
            <button onClick={() => this.buyUpgrade(3)} className="bg-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-3">
              Buy: {this.state.cost[3]}
            </button>
          </div>

        </div>
      </div>
    );
  }
}
