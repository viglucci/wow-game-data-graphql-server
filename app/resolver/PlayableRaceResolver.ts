import { injectable } from "../ioc/ioc";

@injectable()
export default class PlayableRaceResolver {
  getDefinition() {
    return {
      Query: {
        races: async (race, args, { dataSources }) => {
          return await dataSources.races.getAllRaces();
        },
        race: async (race, { id }, { dataSources }) => {
          return await dataSources.races.getRaceById(id);
        }
      },
      PlayableRace: {
        genderName: (race: any) => race.gender_name
      }
    };
  }
}
