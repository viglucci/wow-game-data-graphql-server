import { injectable } from "../ioc/ioc";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class PlayableClassResolver {
  getDefinition() {
    return {
      Query: {
        classes: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.classes.getAllClasses();
        },
        class: async (
          root: any,
          { id }: { id: string },
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.classes.getClassById(id);
        }
      },
      PlayableClass: {
        genderName: (playableClass: any) => playableClass.gender_name,
        powerType: async (
          playableClass: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.powerTypes.getPowerTypeById(
            playableClass.power_type.id
          );
        }
      }
    };
  }
}
