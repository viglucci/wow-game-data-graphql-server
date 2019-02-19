import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystoneLeaderboardResolver {
  public getDefinition() {
    return {
      MythicKeystoneLeaderboardReference: {
        leaderboard: this.getMythicKeystoneLeaderboardFromReference.bind(this)
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
}
