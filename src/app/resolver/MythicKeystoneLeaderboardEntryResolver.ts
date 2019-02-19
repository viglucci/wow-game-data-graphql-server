import { injectable } from 'inversify';

@injectable()
export default class MythicKeystoneLeaderboardEntryResolver {
  public getDefinition() {
    return {
      MythicKeystoneLeaderboardEntry: {
        rank: this.getRank.bind(this),
        timestamp: this.getTimestamp.bind(this),
        keystoneLevel: this.getKeystoneLevel.bind(this),
        groupMembers: this.getGroup.bind(this)
      }
    };
  }

  private getRank(entry: any, args: any, ctx: any) {
    return entry.ranking;
  }

  private getTimestamp(entry: any, args: any, ctx: any) {
    return entry.completed_timestamp / 1000;
  }

  private getKeystoneLevel(entry: any, args: any, ctx: any) {
    return entry.keystone_level;
  }

  private getGroup(entry: any, args: any, ctx: any) {
    return entry.members;
  }
}
