import { injectable } from "../ioc/ioc";

@injectable()
export default class RaceResolver {
  getDefinition() {
    return {
      Query: {
        faction: f => f
      }
    };
  }
}
