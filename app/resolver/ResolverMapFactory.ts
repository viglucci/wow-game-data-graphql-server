import { container, injectable } from "../ioc/ioc";
import HelloResolver from "./HelloResolver";
import RaceResolver from "./RaceResolver";
import extend from "extend";

@injectable()
export default class ResolverMapFactory {
  public static makeMap(): any {
    const helloResolver: HelloResolver = container.get(HelloResolver);
    const raceResolver: RaceResolver = container.get(RaceResolver);

    const map = extend(
      true,
      {},
      helloResolver.getDefinition(),
      raceResolver.getDefinition()
    );

    return map;
  }
}
