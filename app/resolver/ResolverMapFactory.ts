import extend from "extend";
import { injectable, inject } from "../ioc/ioc";
import RaceResolver from "./RaceResolver";
import FactionResolver from "./FactionResolver";

@injectable()
export default class ResolverMapFactory {
  @inject(RaceResolver)
  private raceResolver: RaceResolver;

  @inject(FactionResolver)
  private factionResolver: FactionResolver;

  public makeMap(): any {
    const map = extend(
      true,
      {},
      this.raceResolver.getDefinition(),
      this.factionResolver.getDefinition()
    );

    return map;
  }
}
