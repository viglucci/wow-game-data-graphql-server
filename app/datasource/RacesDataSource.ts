import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import IDocumentLink from "../interfaces/IDocumentLink";
import INamedDocumentLink from "../interfaces/INamedDocumentLink";

@injectable()
export default class RacesDataSource extends GameDataAPIDataSource {
  public async getAllRaces(): Promise<any> {
    const index = await this.getResource("/race/index", {
      namespace: "static-us"
    });
    const individualFetches = index.races.map(
      async (raceLink: INamedDocumentLink) => {
        return this.getResource(raceLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async getRaceById(id: string): Promise<any> {
    return await this.getResource(`/race/${id}`, {
      namespace: "static-us"
    });
  }
}
