import { injectable } from "../ioc/ioc";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class PlayableSpecializationResolver {
  getDefinition() {
    return {
      Query: {
        specializations: async (
          race: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.specializations.getAllSpecializations();
        },
        specialization: async (
          race: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.specializations.getSpecializationById(id);
        }
      },
      PlayableRace: {
        genderName: (race: any) => race.gender_name
      }
    };
  }
}