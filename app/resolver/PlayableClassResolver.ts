import IDataSources from "../interfaces/IDataSources";
import IMediaDocument from "../interfaces/IMediaDocument";
import { injectable } from "../ioc/ioc";
import IKeyValuePair from "../interfaces/IKeyValuePair";
import IMediaMap from "../interfaces/IMediaMap";

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
        },
        media: async (
          playableClass: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          const media: IMediaDocument = await dataSources.document.getDocumentFromDocumentLink(
            playableClass.media
          );
          return media.assets.reduce(
            (assetMap: IMediaMap, asset: IKeyValuePair) => {
              assetMap[asset.key] = {
                url: asset.value
              };
              return assetMap;
            },
            {}
          );
        }
      }
    };
  }
}
