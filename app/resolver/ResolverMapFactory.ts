import extend from "extend";
import { injectable, inject } from "../ioc/ioc";
import PlayableRaceResolver from "./PlayableRaceResolver";
import RealmResolver from "./RealmResolver";
import ConnectedRealmResolver from "./ConnectedRealmResolver";
import PlayableClassResolver from "./PlayableClassResolver";
import LocalizedGenderedNameResolver from "./LocalizedGenderedNameResolver";

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

  @inject(LocalizedGenderedNameResolver)
  private localizedGenderedNameResolver: LocalizedGenderedNameResolver;

  public makeMap(): any {
    const map = extend(
      true,
      {},
      this.raceResolver.getDefinition(),
      this.classResolver.getDefinition(),
      this.realmResolver.getDefinition(),
      this.connectedRealmResolver.getDefinition(),
      this.localizedGenderedNameResolver.getDefinition()
    );

    return map;
  }
}
