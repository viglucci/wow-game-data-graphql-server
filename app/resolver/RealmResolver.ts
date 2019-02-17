import { injectable, inject } from "../ioc/ioc";
import ConnectedRealmMapper from "../mapper/ConnectedRealmMapper";
import RealmMapper from "../mapper/RealmMapper";

@injectable()
export default class RealmResolver {
  @inject(ConnectedRealmMapper)
  connectedRealmMapper: ConnectedRealmMapper;

  @inject(RealmMapper)
  realmMapper: RealmMapper;

  getDefinition() {
    return {
      Query: {
        realms: this.resolveAllRealms.bind(this),
        realm: this.resolveRealm.bind(this),
        connectedRealms: this.resolveConnectedRealms.bind(this),
        connectedRealm: this.resolveConnectedRealm.bind(this)
      },
      ConnectedRealm: {
        hasQueue: (connectedRealm: any) => {
          return this.connectedRealmMapper.getHasQueue(connectedRealm);
        },
        realms: (connectedRealm: any) => {
          return connectedRealm.realms;
        }
      },
      Realm: {
        isTournamentRealm: (realm: any) => {
          return this.realmMapper.getIsTournamentRealm(realm);
        },
        connectedRealm: async (realm: any, args: any, { dataSources }) => {
          return await dataSources.realms.getConnectedRealmByKey(
            realm.connected_realm
          );
        }
      }
    };
  }

  protected async resolveConnectedRealms(
    connectedRealm: any,
    args: any,
    { dataSources }
  ) {
    return await dataSources.realms.getAllConnectedRealms();
  }

  protected async resolveConnectedRealm(
    connectedRealm: any,
    { id },
    { dataSources }
  ) {
    return await dataSources.realms.getConnectedRealmById(id);
  }

  protected async resolveAllRealms(realm: any, args: any, { dataSources }) {
    return await dataSources.realms.getAllRealms();
  }

  protected async resolveRealm(realm: any, { id }, { dataSources }) {
    return await dataSources.realms.getRealmById(id);
  }
}
