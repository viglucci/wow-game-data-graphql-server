import { injectable } from "../ioc/ioc";

@injectable()
export default class FactionResolver {
  getDefinition() {
    return {
      Race: {
        faction: (race, { id }, { dataSources }) => {
          return race.faction;
        }
      }
    };
  }
}
