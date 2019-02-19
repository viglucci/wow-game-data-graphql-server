import extend from 'extend';
import { inject, injectable } from '../ioc/ioc';
import ConnectedRealmResolver from './ConnectedRealmResolver';
import MythicKeystoneDungeonResolver from './MythicKeystoneDungeonResolver';
import MythicKeystonePeriodResolver from './MythicKeystonePeriodResolver';
import MythicKeystoneSeasonResolver from './MythicKeystoneSeasonResolver';
import MythicRaidLeaderboardResolver from './MythicRaidLeaderboardResolver';
import PlayableClassResolver from './PlayableClassResolver';
import PlayableRaceResolver from './PlayableRaceResolver';
import PlayableSpecializationResolver from './PlayableSpecializationResolver';
import PowerTypeResolver from './PowerTypeResolver';
import RealmResolver from './RealmResolver';
import TalentResolver from './TalentResolver';
import WoWTokenResolver from './WoWTokenResolver';
import GuildResolver from './GuildResolver';
import MythicRaidLeaderboardEntryResolver from './MythicRaidLeaderboardEntryResolver';
@injectable()
export default class ResolverMapFactory {
  @inject(PlayableRaceResolver)
  private raceResolver: PlayableRaceResolver;

  @inject(PlayableClassResolver)
  private classResolver: PlayableClassResolver;

  @inject(RealmResolver)
  private realmResolver: RealmResolver;

  @inject(ConnectedRealmResolver)
  private connectedRealmResolver: ConnectedRealmResolver;

  @inject(PowerTypeResolver)
  private powerTypeResolver: PowerTypeResolver;

  @inject(PlayableSpecializationResolver)
  private playableSpecializationResolver: PlayableSpecializationResolver;

  @inject(TalentResolver)
  private talentResolver: TalentResolver;

  @inject(WoWTokenResolver)
  private tokenResolver: WoWTokenResolver;

  @inject(MythicRaidLeaderboardResolver)
  private mythicRaidLeaderboardResolver: MythicRaidLeaderboardResolver;

  @inject(MythicRaidLeaderboardEntryResolver)
  private mythicRaidLeaderboardEntryResolver: MythicRaidLeaderboardEntryResolver;

  @inject(MythicKeystonePeriodResolver)
  private mythicKeystonePeriodResolver: MythicKeystonePeriodResolver;

  @inject(MythicKeystoneSeasonResolver)
  private mythicKeystoneSeasonResolver: MythicKeystoneSeasonResolver;

  @inject(MythicKeystoneDungeonResolver)
  private mythicKeystoneDungeonResolver: MythicKeystoneDungeonResolver;

  @inject(GuildResolver)
  private guildResolver: GuildResolver;

  public makeMap(): any {
    const map = extend(
      true,
      {},
      this.raceResolver.getDefinition(),
      this.classResolver.getDefinition(),
      this.realmResolver.getDefinition(),
      this.connectedRealmResolver.getDefinition(),
      this.powerTypeResolver.getDefinition(),
      this.playableSpecializationResolver.getDefinition(),
      this.talentResolver.getDefinition(),
      this.tokenResolver.getDefinition(),
      this.mythicRaidLeaderboardResolver.getDefinition(),
      this.mythicRaidLeaderboardEntryResolver.getDefinition(),
      this.mythicKeystonePeriodResolver.getDefinition(),
      this.mythicKeystoneSeasonResolver.getDefinition(),
      this.mythicKeystoneDungeonResolver.getDefinition(),
      this.guildResolver.getDefinition()
    );

    return map;
  }
}
