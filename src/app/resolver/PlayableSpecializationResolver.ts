import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class PlayableSpecializationResolver {
  public getDefinition() {
    return {
      Query: {
        specializations: async (
          race: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.specializations.getAllSpecializations();
        },
        specializationById: async (
          race: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.specializations.specializationById(id);
        }
      },
      PlayableSpecialization: {
        description: (specialization: any) => specialization.gender_description,
        class: async (
          specialization: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.classes.cassById(
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
