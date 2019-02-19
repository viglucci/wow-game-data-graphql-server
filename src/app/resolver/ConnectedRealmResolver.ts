import { inject, injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import ConnectedRealmMapper from '../mapper/ConnectedRealmMapper';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

@injectable()
export default class ConnectedRealmResolver {
  @inject(ConnectedRealmMapper)
  public connectedRealmMapper: ConnectedRealmMapper;

  public getDefinition() {
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
        },
        mythicKeystoneLeaderboards: this.getMythicKeystoneLeaderboardsForRealm.bind(
          this
        )
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
    args: IQueryInput<IByIdInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.realms.connectedRealmById(args.input.id);
  }

  protected async getMythicKeystoneLeaderboardsForRealm(
    connectedRealm: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    const leaderboardIndex = await dataSources.mythicKeystone.getResource(
      connectedRealm.mythic_leaderboards
    );
    return leaderboardIndex.current_leaderboards;
  }
}
