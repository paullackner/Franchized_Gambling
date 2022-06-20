import React from "react";
import Phaser from "phaser";
import mapGame from "../phaser/scene";
var axios = require('axios');

export default class Game extends React.Component {
  phaserGame;
  config;

  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      cost: [0, 0],
      level: [0, 0],
    }
  }


  componentDidMount() {
    this.config = {
      type: Phaser.AUTO,
      width: 50 * 16,
      height: 20 * 16,
      zoom: window.innerWidth / (50 * 16),
      parent: document.getElementById("gamediv"),
      pixelArt: true,
      testConfig: 'this is a test',
      scene: mapGame,
    };
    this.phaserGame = new Phaser.Game(this.config);

    axios.get('/user/info').then((response) => {
      this.setState({ money: response.data.money })
    });

    axios.get('/games/map/costs').then((response) => {
      console.log(response);
      this.setState({cost: response.data.costs, level: response.data.levels});
      this.phaserGame.registry.set('levels', response.data.levels)
      this.phaserGame.scene.getAt(0).setHeight(0, response.data.levels[0]);
      this.phaserGame.scene.getAt(0).setHeight(1, response.data.levels[1]);
    });
  }

  upgradeBuilding(id) {
    axios.get('/games/map/upgrade', {params: {number: id}}).then((response) => {
      if (response.data.number == -1) {
        return;
      }
      console.log(response);
      let level = this.state.level;
      level[id]++
      let cost = this.state.cost;
      cost[id] = response.data.cost;
      this.setState({ level: level, money: this.state.money - response.data.cost, cost: cost });
      this.phaserGame.scene.getAt(0).setHeight(id, level[id])
    })
  }

  render() {
    return (
      <div>
        <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white'">
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">
              Building 1 - Level: {this.state.level[0]}
            </p>
            <button className="bg-[#00df9a] font-bold rounded-md px-6 py-3" onClick={() => { this.upgradeBuilding(0) }}>
              Upgrade: {this.state.cost[0]}$
            </button>
          </div>
          <div>
            <button className="border border-[#00df9a] rounded px-2 py-1 w-full text-3xl font-bold text-[#00df9a]">
              Money: {this.state.money}$
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">
              Building 2 - Level: {this.state.level[1]}
            </p>
            <button className="bg-[#00df9a] font-bold rounded-md px-6 py-3"
              onClick={() => { this.upgradeBuilding(1) }}
              type="button">
              Upgrade: {this.state.cost[1]}$
            </button>
          </div>
        </div>
        <div id="gamediv" />
      </div>
    );
  }
}
