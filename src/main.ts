import { Application, Assets, Sprite, Container } from "pixi.js";



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
  const first_container = new Container();

  app.stage.addChild(first_container)


  // Load the bunny texture
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

  const bunny = new Sprite(texture);

  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  first_container.addChild(bunny);


  // Move the container to the center
  first_container.x = app.screen.width / 2;
  first_container.y = app.screen.height / 2;


  // Listen for animate update
  app.ticker.add((time) => {
    // Continuously rotate the container!
    // * use delta to create frame-independent transform *
    first_container.rotation -= 0.01 * time.deltaTime;
  });


})();
