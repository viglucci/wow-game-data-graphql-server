import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class RealmsDataSource extends GameDataAPIDataSource {
  public async getAllRealms(): Promise<any> {
    const index = await this.getResource("/realm/index", {
      namespace: "dynamic-us"
    });
    const individualFetches = index.realms.map(async raceLink => {
      return this.getResource(raceLink.key);
    });
    return await Promise.all(individualFetches);
  }

  public async getRealmById(id: string): Promise<any> {
    return await this.getResource(`/realm/${id}`, {
      namespace: "dynamic-us"
    });
  }
}
