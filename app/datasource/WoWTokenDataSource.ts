import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class WoWTokenDataSource extends GameDataAPIDataSource {
  public async getWoWToken(): Promise<any> {
    return await this.getResource(`/token/index`, {
      namespace: "dynamic-us"
    });
  }
}
