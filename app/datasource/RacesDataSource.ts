import { injectable, inject } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class RacesDataSource {
  @inject(GameDataAPIDataSource)
  private gdapi: GameDataAPIDataSource;

  public async getRaces(): Promise<any> {
    return this.gdapi.getResource("/race/index", {
      namespace: "static-us"
    });
  }

  getRace(): any {}
}
