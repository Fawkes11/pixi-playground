import { Container, BaseTexture, Texture, Sprite, Rectangle } from "pixi.js";

export class Player extends Container {
  private frames: Texture[][] = []; // filas = direcciones, columnas = frames
  private sprite: Sprite;
  private frameIndex = 0;
  private elapsed = 0;
  private speed = 2;
  private direction = 0; // 0: down, 1: left, 2: right, 3: up
  private keys: Record<string, boolean> = {};

  constructor() {
    super();

    const base = BaseTexture.from("/assets/characters/hero.png");
    const frameWidth = 48;
    const frameHeight = 48;
    const rows = 4;
    const cols = 4;

    // Cortar todas las filas y columnas del sprite sheet
    for (let y = 0; y < rows; y++) {
      const rowFrames: Texture[] = [];
      for (let x = 0; x < cols; x++) {
        const frame = new Texture(base, new Rectangle(x * frameWidth, y * frameHeight, frameWidth, frameHeight));
        rowFrames.push(frame);
      }
      this.frames.push(rowFrames);
    }

    this.sprite = new Sprite(this.frames[0][0]);
    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);

    this.setupKeyboard();
  }

  private setupKeyboard() {
    window.addEventListener("keydown", e => (this.keys[e.key] = true));
    window.addEventListener("keyup", e => (this.keys[e.key] = false));
  }

  private handleMovement() {
    let moving = false;

    if (this.keys["ArrowDown"]) {
      this.y += this.speed;
      this.direction = 0;
      moving = true;
    }
    if (this.keys["ArrowLeft"]) {
      this.x -= this.speed;
      this.direction = 1;
      moving = true;
    }
    if (this.keys["ArrowRight"]) {
      this.x += this.speed;
      this.direction = 2;
      moving = true;
    }
    if (this.keys["ArrowUp"]) {
      this.y -= this.speed;
      this.direction = 3;
      moving = true;
    }

    // Si se mueve, avanza los frames de la fila correspondiente
    if (moving) {
      this.elapsed++;
      if (this.elapsed > 6) {
        this.frameIndex = (this.frameIndex + 1) % this.frames[this.direction].length;
        this.sprite.texture = this.frames[this.direction][this.frameIndex];
        this.elapsed = 0;
      }
    } else {
      // Si no se mueve, frame inicial
      this.frameIndex = 0;
      this.sprite.texture = this.frames[this.direction][0];
    }
  }

  update(delta: number) {
    this.handleMovement();
  }
}
