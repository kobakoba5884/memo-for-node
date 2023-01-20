import { GameProcedure } from "./modules/gameProcedure";

(async () => {
  new GameProcedure().start();
})().catch((err) => console.log(err));
