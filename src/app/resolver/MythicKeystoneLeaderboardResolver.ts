import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystoneLeaderboardResolver {
  public getDefinition() {
    return {
      MythicKeystoneLeaderboardReference: {
        leaderboard: this.getMythicKeystoneLeaderboardFromReference.bind(this)
      },
      MythicKeystoneLeaderboard: {
        id: this.getIdFromMythicKeystoneLeaderboard.bind(this),
        period: this.getPeriodFromMythicKeystoneLeaderboard.bind(this),
        connectedRealm: this.getConnectedRealmFromMythicKeystoneLeaderboard.bind(
          this
        )
      }
    };
  }

  private async getMythicKeystoneLeaderboardFromReference(
    ref: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.mythicKeystone.getResource(ref.key);
  }

  private async getIdFromMythicKeystoneLeaderboard(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return leaderboard.map_challenge_mode_id;
  }

  private async getConnectedRealmFromMythicKeystoneLeaderboard(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.mythicKeystone.getResource(
      leaderboard.connected_realm
    );
  }

  private getPeriodFromMythicKeystoneLeaderboard(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystonePeriodById(
      leaderboard.period
    );
  }
}
