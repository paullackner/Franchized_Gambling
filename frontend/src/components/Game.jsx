import React from "react";
import Phaser from "phaser";
import playGame from "../phaser/scene";

export default class Game extends React.Component {
    phaserGame;
    config;

    height = 20;
    width = 50;

    componentDidMount() {
        this.config = {
            type: Phaser.AUTO,
            parent: "phaser",
            width: window.innerWidth,
            height: window.innerHeight - 100,
            parent: document.getElementById("gamediv"),
            scene: playGame
        }
        this.phaserGame = new Phaser.Game(this.config);
    }

    render() {
        return (
			<div id="gamediv" />
		);
    }
}