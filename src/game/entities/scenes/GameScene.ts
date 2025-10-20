import { Container } from "pixi.js";
import { Player } from "../Player";
import { setupKeyboard } from "../../../utils/keyboard";

export class GameScene extends Container {
  private player: Player;
  private keys: Record<string, boolean>;

  constructor() {
    super();
    this.keys = setupKeyboard();
    this.player = new Player();
    this.addChild(this.player);
  }

  update() {
    this.player.move(this.keys);
    console.log(this.player)
  }
}
