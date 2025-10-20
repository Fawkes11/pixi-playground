import { Application, Assets, Sprite, Container } from "pixi.js";
import { GameScene } from "./game/entities/scenes/GameScene";


/** Setup app and initialise assets */
(async () => {

  const app = new Application();

  //Initialize the application
  await app.init({
    background: '#1099bb',
    resizeTo: window
  });

  //Append the aplication canvas to document body
  document.body.appendChild(app.canvas);

  //Create and add a container to the stage

  const scene = new GameScene();  
  app.stage.addChild(scene)


  // Listen for animate update
  app.ticker.add(() => {
    // Continuously rotate the container!
    // * use delta to create frame-independent transform *
    scene.update();
  });


})();
