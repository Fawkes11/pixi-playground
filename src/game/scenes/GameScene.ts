import { Container } from "pixi.js";
import { Player } from "../entities/Player";
import { setupKeyboard } from "../../utils/keyboard";

export class GameScene extends Container {
  private player: Player;
  private keys: Record<string, boolean>;

  constructor() {
    super();
    this.keys = setupKeyboard();
    this.player = new Player();
    this.player.x = 200;
    this.player.y = 300;
    this.addChild(this.player);
  }

  update(delta: number) {
    this.player.update();
  }
}

