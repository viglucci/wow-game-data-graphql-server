import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicRaidLeaderboardResolver {
  public getDefinition() {
    return {
      Query: {
        mythicRaidLeaderboard: this.getMythicRaidLeaderboard.bind(this)
      }
    };
  }

  private async getMythicRaidLeaderboard(
    root: any,
    { raidSlug, factionSlug }: { raidSlug: string; factionSlug: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.mythicRaidLeaderboards.getLeaderboard(
      raidSlug,
      factionSlug
    );
  }
}
