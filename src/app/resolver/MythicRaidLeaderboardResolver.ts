import { injectable } from "inversify";
import IDataSources from "../../interfaces/IDataSources";

@injectable()
export default class MythicRaidLeaderboardResolver {
  getDefinition() {
    return {
      Query: {
        mythicRaidLeaderboard: this.getMythicRaiderLeaderboard.bind(this)
      }
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
