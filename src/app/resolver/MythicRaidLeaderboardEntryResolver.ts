import { injectable } from 'inversify';

@injectable()
export default class MythicRaidLeaderboardEntryResolver {
  getDefinition() {
    return {
      MythicRaidLeaderboardEntry: {
        guild: this.getGuildFromEntry.bind(this),
        timestamp: this.getTimestamp.bind(this)
      }
    };
  }

  private async getGuildFromEntry(entry: any, args: any, ctx: any) {
    return {
      ...entry.guild,
      region: entry.region
    };
  }

  private async getTimestamp(entry: any, args: any, ctx: any) {
    return entry.timestamp / 1000;
  }
}
