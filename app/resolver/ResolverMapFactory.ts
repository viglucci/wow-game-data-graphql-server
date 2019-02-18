import extend from "extend";
import { inject, injectable } from "../ioc/ioc";
import ConnectedRealmResolver from "./ConnectedRealmResolver";
import LocalizedGenderedStringResolver from "./LocalizedGenderedStringResolver";
import MythicKeystonePeriodResolver from "./MythicKeystonePeriodResolver";
import MythicKeystoneSeasonResolver from "./MythicKeystoneSeasonResolver";
import MythicRaidLeaderboardResolver from "./MythicRaidLeaderboardResolver";
import PlayableClassResolver from "./PlayableClassResolver";
import PlayableRaceResolver from "./PlayableRaceResolver";
import PlayableSpecializationResolver from "./PlayableSpecializationResolver";
import PowerTypeResolver from "./PowerTypeResolver";
import RealmResolver from "./RealmResolver";
import TalentResolver from "./TalentResolver";
import WoWTokenResolver from "./WoWTokenResolver";

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

  @inject(LocalizedGenderedStringResolver)
  private localizedGenderedNameResolver: LocalizedGenderedStringResolver;

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

  @inject(MythicKeystonePeriodResolver)
  private mythicKeystonePeriodResolver: MythicKeystonePeriodResolver;

  @inject(MythicKeystoneSeasonResolver)
  private mythicKeystoneSeasonResolver: MythicKeystoneSeasonResolver;

  public makeMap(): any {
    const map = extend(
      true,
      {},
      this.raceResolver.getDefinition(),
      this.classResolver.getDefinition(),
      this.realmResolver.getDefinition(),
      this.connectedRealmResolver.getDefinition(),
      this.localizedGenderedNameResolver.getDefinition(),
      this.powerTypeResolver.getDefinition(),
      this.playableSpecializationResolver.getDefinition(),
      this.talentResolver.getDefinition(),
      this.tokenResolver.getDefinition(),
      this.mythicRaidLeaderboardResolver.getDefinition(),
      this.mythicKeystonePeriodResolver.getDefinition(),
      this.mythicKeystoneSeasonResolver.getDefinition()
    );

    return map;
  }
}
