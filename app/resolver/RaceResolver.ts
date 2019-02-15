import { injectable } from "../ioc/ioc";

const raceIndex = require("./races.json");

@injectable()
export default class RaceResolver {
  getDefinition() {
    return {
      Query: {
        races: () => {
          return raceIndex.races;
        }
      }
    };
  }
}
