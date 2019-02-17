import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class RacesDataSource extends GameDataAPIDataSource {
  public async getAllRaces(): Promise<any> {
    const index = await this.getResource("/race/index", {
      namespace: "static-us"
    });
    const individualFetches = index.races.map(async raceLink => {
      return this.getResource(raceLink.key);
    });
    return await Promise.all(individualFetches);
  }

  public async getRaceById(id: string): Promise<any> {
    return await this.getResource(`/race/${id}`, {
      namespace: "static-us"
    });
  }
}
