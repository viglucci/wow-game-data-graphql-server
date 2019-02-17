import { injectable } from "../ioc/ioc";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class PowerTypeResolver {
  getDefinition() {
    return {
      Query: {
        powerTypes: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.getAllPowerTypes();
        },
        powerType: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.getPowerTypeById(id);
        }
      }
    };
  }
}
