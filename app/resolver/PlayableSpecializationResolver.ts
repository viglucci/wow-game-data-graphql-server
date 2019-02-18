import { injectable } from "inversify";
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
      PlayableSpecialization: {
        description: (specialization: any) => specialization.gender_description,
        class: async (
          specialization: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.classes.getClassById(
            specialization.playable_class.id
          );
        },
        talents: async (
          specialization: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return specialization.talent_tiers;
        }
      }
    };
  }
}
