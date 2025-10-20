import { Assets } from "pixi.js";

// Registro de rutas de imágenes
export const assetManifest = {
  hero: "/assets/characters/hero.png",
  bunny: "https://pixijs.io/examples/examples/assets/bunny.png",
};

// Función asincrónica para precargar
export async function loadAssets() {
  // Esto carga todos los assets definidos en el manifest
  await Assets.load(Object.values(assetManifest));
  console.log("✅ Assets cargados");
}
