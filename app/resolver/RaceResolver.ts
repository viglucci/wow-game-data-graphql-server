import { injectable } from "../ioc/ioc";

@injectable()
export default class RaceResolver {
  getDefinition() {
    return {
      Query: {
        races: async (root, args, { dataSources }) => {
          return await dataSources.racesAPI.getAllRaces();
        },
        race: async (root, { id }, { dataSources }) => {
          return await dataSources.racesAPI.getRace(id);
        }
      }
    };
  }
}
