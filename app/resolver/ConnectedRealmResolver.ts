import IDataSources from "../interfaces/IDataSources";
import { inject, injectable } from "../ioc/ioc";
import ConnectedRealmMapper from "../mapper/ConnectedRealmMapper";

@injectable()
export default class ConnectedRealmResolver {
  @inject(ConnectedRealmMapper)
  connectedRealmMapper: ConnectedRealmMapper;

  getDefinition() {
    return {
      Query: {
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
      }
    };
  }

  protected async resolveConnectedRealms(
    connectedRealm: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.getAllConnectedRealms();
  }

  protected async resolveConnectedRealm(
    connectedRealm: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.getConnectedRealmById(id);
  }
}
