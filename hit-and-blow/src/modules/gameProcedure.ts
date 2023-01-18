import { NextAction, nextActions } from "../types/customType";
import { printLine, promptSelect } from "../utils/console.io";
import { HitAndBlow } from "./hitAndBlow";

export class GameProcedure {
  private currentGameTitle = "hit and blow";
  private currentGame = new HitAndBlow();

  public async start() {
    await this.play();
  }

  private async play() {
    printLine(`===\ncurrent game is ${this.currentGameTitle}.\n===`);
    await this.currentGame.setting();
    await this.currentGame.play();
    this.currentGame.end();

    const action = await promptSelect<NextAction>(
      "do you wanna continue?",
      nextActions
    );

    if (action === "play again") {
      await this.play();
    } else if (action === "exit") {
      this.end();
    } else {
      const neverValue: never = action;
      throw new Error(`${neverValue} is an invalid action.`);
    }
  }

  private end() {
    printLine("game be finished!!");
    process.exit();
  }
}
