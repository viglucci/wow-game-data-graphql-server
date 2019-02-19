import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystoneLeaderboardResolver {
  public getDefinition() {
    return {
      MythicKeystoneLeaderboard: {
        id: this.getId.bind(this),
        period: this.getPeriod.bind(this),
        connectedRealm: this.getConnectedRealm.bind(this),
        entries: this.getEntries.bind(this)
      }
    };
  }

  private async getId(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return leaderboard.map_challenge_mode_id;
  }

  private async getConnectedRealm(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getResource(leaderboard.connected_realm);
  }

  private async getPeriod(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystonePeriodById(
      leaderboard.period
    );
  }

  private getEntries(
    leaderboard: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return leaderboard.leading_groups;
  }
}
