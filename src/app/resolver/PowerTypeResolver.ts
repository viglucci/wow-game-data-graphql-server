import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class PowerTypeResolver {
  public getDefinition() {
    return {
      Query: {
        powerTypes: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.getAllPowerTypes();
        },
        powerTypeById: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.powerTypeById(id);
        }
      }
    };
  }
}
