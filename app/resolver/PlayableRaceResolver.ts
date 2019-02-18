import { injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";
@injectable()
export default class PlayableRaceResolver {
  getDefinition() {
    return {
      Query: {
        races: async (
          race: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.races.getAllRaces();
        },
        race: async (
          race: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.races.getRaceById(id);
        }
      },
      PlayableRace: {
        genderName: (race: any) => race.gender_name
      }
    };
  }
}
