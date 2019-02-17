import extend from "extend";
import { injectable, inject } from "../ioc/ioc";
import RaceResolver from "./RaceResolver";
import FactionResolver from "./FactionResolver";
import RealmResolver from "./RealmResolver";

@injectable()
export default class ResolverMapFactory {
  @inject(RaceResolver)
  private raceResolver: RaceResolver;

  @inject(FactionResolver)
  private factionResolver: FactionResolver;

  @inject(RealmResolver)
  private realmResolver: RealmResolver;

  public makeMap(): any {
    const map = extend(
      true,
      {},
      this.raceResolver.getDefinition(),
      this.factionResolver.getDefinition(),
      this.realmResolver.getDefinition()
    );

    return map;
  }
}
