
import { App } from "./app";
import { StockController } from "./controller/StockController";

async function main () {
  const app = new App();
  await app.setup(
    [
      new StockController(app)
    ],
    6789
  );
  app.listen();
}

main();
