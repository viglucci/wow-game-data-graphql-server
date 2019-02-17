import { injectable } from "../ioc/ioc";

@injectable()
export default class RealmResolver {
  getDefinition() {
    return {
      Query: {
        realms: async (realm: any, args: any, { dataSources }) => {
          return await dataSources.realms.getAllRealms();
        },
        realm: async (realm: any, { id }, { dataSources }) => {
          return await dataSources.realms.getRealmById(id);
        }
      },
      Realm: {
        isTournamentRealm: (realm: any) => {
          return realm.is_tournament;
        }
      }
    };
  }
}
