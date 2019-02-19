import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

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
          args: IQueryInput<IByIdInput>,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.specializations.specializationById(
            args.input.id
          );
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
