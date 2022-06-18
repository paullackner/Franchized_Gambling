import Phaser from "phaser";
import citytiles from "../assets/tilesets/CP_V1.0.4.png";
import tilemap from "../assets/tilesets/map.json";
import roofImage from "../assets/tilesets/roof.png";

class mapGame extends Phaser.Scene {

  controls;

  preload() {
    this.load.image('tiles', citytiles);
    this.load.tilemapTiledJSON('map', tilemap);
    this.load.image('roof', roofImage);
  }

  create() {
    var map = this.make.tilemap({key: 'map'});
    var tiles = map.addTilesetImage('base', 'tiles');
    var baseLayer = map.createLayer(0, tiles);
    var bridgeLayer = map.createLayer(1, tiles);
    var buildingsLayer = map.createLayer(2, tiles);
    var decalsLayer = map.createLayer(3, tiles);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.centerOnY(450)

    var cursors = this.input.keyboard.createCursorKeys();
    // var x = this.input.mouse.onMouseDown.call

    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.005
    };

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  }

  update(delta) {
    this.controls.update(delta);
  }

  setHeight(id, height) {
    let x = (id === 0)? 18.5 : 47.5;
    let y = (id === 0)? 31 : 23;

    for (let i = 0; i < height; i++) {
      var roof = this.add.image(x * 16, y * 16, 'roof')
      y -= 1;
    }
  }
}

export default mapGame;