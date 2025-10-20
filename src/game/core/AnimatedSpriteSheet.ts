import { Container, Texture, Sprite, Rectangle } from "pixi.js";

export class AnimatedSpriteSheet extends Container {
  private frames: Texture[][] = [];
  private sprite: Sprite;
  private frameIndex = 0;
  private elapsed = 0;
  private frameSpeed = 6; // menor = más rápido
  public direction = 0;   // 0: abajo, 1: izq, 2: der, 3: arriba

  constructor(texture: Texture, rows: number, cols: number, frameW: number, frameH: number) {
    super();

    // Cortar la textura base
    for (let y = 0; y < rows; y++) {
      const rowFrames: Texture[] = [];
      for (let x = 0; x < cols; x++) {
        const frame = new Texture({
          source: texture.source,
          frame: new Rectangle(x * frameW, y * frameH, frameW, frameH),
        });
        rowFrames.push(frame);
      }
      this.frames.push(rowFrames);
    }
    console.log(this.frames)
    this.sprite = new Sprite(this.frames[0][0]);
    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);
  }

  play() {
    this.elapsed++;
    if (this.elapsed > this.frameSpeed) {
      this.frameIndex = (this.frameIndex + 1) % this.frames[this.direction].length;
      this.sprite.texture = this.frames[this.direction][this.frameIndex];
      this.elapsed = 0;
    }
  }

  stop() {
    this.frameIndex = 0;
    this.sprite.texture = this.frames[this.direction][0];
  }
}
