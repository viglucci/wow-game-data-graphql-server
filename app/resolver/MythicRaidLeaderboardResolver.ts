import IDataSources from "../interfaces/IDataSources";
import { injectable } from "../ioc/ioc";

@injectable()
export default class MythicRaidLeaderboardResolver {
  getDefinition() {
    return {
      Query: {
        mythicRaidLeaderboard: this.getMythicRaiderLeaderboard.bind(this)
      },
      MythicRaidLeaderboard: {}
    };
  }

  private async getMythicRaiderLeaderboard(
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
