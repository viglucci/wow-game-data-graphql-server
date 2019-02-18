import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class MythicRaidLeaderboardDataSource extends GameDataAPIDataSource {
  public async getLeaderboard(
    raidSlug: string,
    factionSlug: string
  ): Promise<any> {
    return await this.getResource(
      `/leaderboard/hall-of-fame/${raidSlug}/${factionSlug}`,
      {
        namespace: "DYNAMIC"
      }
    );
  }
}
