import { inject, injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";
import RealmMapper from "../mapper/RealmMapper";

@injectable()
export default class RealmResolver {
  @inject(RealmMapper)
  realmMapper: RealmMapper;

  getDefinition() {
    return {
      Query: {
        realms: this.resolveAllRealms.bind(this),
        realm: this.resolveRealm.bind(this)
      },
      Realm: {
        isTournamentRealm: (realm: any) => {
          return this.realmMapper.getIsTournamentRealm(realm);
        },
        connectedRealm: async (
          realm: any,
          args: any,
          { dataSources }: { dataSources: IDataSources }
        ) => {
          return await dataSources.realms.getConnectedRealmByKey(
            realm.connected_realm
          );
        }
      }
    };
  }

  protected async resolveAllRealms(
    realm: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.getAllRealms();
  }

  protected async resolveRealm(
    realm: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.getRealmById(id);
  }
}
