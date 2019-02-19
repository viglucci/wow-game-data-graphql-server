import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

@injectable()
export default class PowerTypeResolver {
  public getDefinition() {
    return {
      Query: {
        powerTypes: async (
          root: any,
          args: IQueryInput<IByIdInput>,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.getAllPowerTypes();
        },
        powerTypeById: async (
          root: any,
          args: IQueryInput<IByIdInput>,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.powerTypeById(args.input.id);
        }
      }
    };
  }
}
