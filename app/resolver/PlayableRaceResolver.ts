import { injectable } from "../ioc/ioc";

@injectable()
export default class PlayableRaceResolver {
  getDefinition() {
    return {
      Query: {
        races: async (root, args, { dataSources }) => {
          return await dataSources.races.getAllRaces();
        },
        race: async (root, { id }, { dataSources }) => {
          return await dataSources.races.getRace(id);
        }
      }
    };
  }
}
