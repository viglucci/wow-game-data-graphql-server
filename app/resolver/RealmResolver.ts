import IDataSources from "../interfaces/IDataSources";
import { inject, injectable } from "../ioc/ioc";
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

  protected async resolveRealm(realm: any, { id }, { dataSources }) {
    return await dataSources.realms.getRealmById(id);
  }
}
