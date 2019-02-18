import { inject, injectable } from "inversify";
import IDataSources from "../../interfaces/IDataSources";
import ConnectedRealmMapper from "../mapper/ConnectedRealmMapper";

@injectable()
export default class ConnectedRealmResolver {
  @inject(ConnectedRealmMapper)
  connectedRealmMapper: ConnectedRealmMapper;

  getDefinition() {
    return {
      Query: {
        connectedRealms: this.getConnectedRealms.bind(this),
        connectedRealmById: this.getConnectedRealm.bind(this)
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

  protected async getConnectedRealms(
    connectedRealm: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.getAllConnectedRealms();
  }

  protected async getConnectedRealm(
    connectedRealm: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.connectedRealmById(id);
  }
}
