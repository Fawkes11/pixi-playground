import { Container, Texture } from "pixi.js";
import { assetManifest } from "../core/assets";
import { AnimatedSpriteSheet } from "../core/AnimatedSpriteSheet";

export class Player extends Container {
  private spriteSheet: AnimatedSpriteSheet;
  private speed = 2;
  private keys: Record<string, boolean> = {};

  constructor() {
    super();

    // Crear la hoja animada (4x4 frames de 48x48)
    const texture = Texture.from(assetManifest.hero);
    this.spriteSheet = new AnimatedSpriteSheet(texture, 4, 4, 48, 48);
    this.addChild(this.spriteSheet);

    this.setupKeyboard();
  }

  private setupKeyboard() {
    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
  }

  private handleMovement() {
    let moving = false;

    if (this.keys["ArrowDown"] || this.keys["s"]) {
      this.y += this.speed;
      this.spriteSheet.direction = 0;
      moving = true;
    }
    if (this.keys["ArrowLeft"] || this.keys["a"]) {
      this.x -= this.speed;
      this.spriteSheet.direction = 2;
      moving = true;
    }
    if (this.keys["ArrowRight"] || this.keys["d"]) {
      this.x += this.speed;
      this.spriteSheet.direction = 3;
      moving = true;
    }
    if (this.keys["ArrowUp"] || this.keys["w"]) {
      this.y -= this.speed;
      this.spriteSheet.direction = 1;
      moving = true;
    }

    if (moving) this.spriteSheet.play();
    else this.spriteSheet.stop();
  }

  update() {
    this.handleMovement();
  }
}
