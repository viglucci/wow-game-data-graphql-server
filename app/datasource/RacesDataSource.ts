import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";

@injectable()
export default class RacesDataSource extends GameDataAPIDataSource {
  public async getAllRaces(): Promise<any> {
    const raceIndex = await this.getResource("/race/index", {
      namespace: "static-us"
    });
    const raceFetches = raceIndex.races.map(async raceLink => {
      return this.getResource(raceLink.key);
    });
    return await Promise.all(raceFetches);
  }

  public async getRaceById(id: string): Promise<any> {
    return await this.getResource(`/race/${id}`, {
      namespace: "static-us"
    });
  }
}
