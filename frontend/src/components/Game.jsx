import React from "react";
import Phaser from "phaser";
import mapGame from "../phaser/scene";

export default class Game extends React.Component {
  phaserGame;
  config;

  money = 5000;
  cost = [100, 100];
  level = [0, 0];

  constructor(props) {
    super(props);
    this.state = {
        money : 5000,
        cost : [100, 100],
        level : [0, 0],
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
      scene: mapGame,
    };
    this.phaserGame = new Phaser.Game(this.config);
  }

  upgradeBuilding(id) {
    if (this.state.money >= this.state.cost[id]) {
        let level = this.state.level;
        level[id]++
        this.setState({level : level});
        this.setState({money : this.state.money - this.state.cost[id]});
        this.phaserGame.scene.getAt(0).setHeight(id, level[id])
    }
  }

  render() {
    return (
      <div>
        <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white'">
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">
              Building 1 - Level: {this.state.level[0]}
            </p>
            <button className="bg-[#00df9a] font-bold rounded-md px-6 py-3" onClick={() => {this.upgradeBuilding(0)}}>
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
                    onClick={() => {this.upgradeBuilding(1)}}
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
