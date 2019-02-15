import { container, injectable } from "../ioc/ioc";
import HelloResolver from "./HelloResolver";

@injectable()
export default class ResolverMapFactory {
  public static makeMap(): any {
    const helloResolver: HelloResolver = container.get(HelloResolver);

    return {
      ...helloResolver.getDefinition()
    };
  }
}
