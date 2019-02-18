import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../interfaces/INamedDocumentLink";

@injectable()
export default class MythicKeystoneDungeonDataSource extends GameDataAPIDataSource {
  public async mythicKeystoneDungeons(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/dungeon/index`, {
      namespace: "dynamic-us"
    });
    const individualFetches = index.dungeons.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async mythicKeystoneDungeonById(id: string): Promise<any> {
    return await this.getResource(`/mythic-keystone/dungeon/${id}`, {
      namespace: "dynamic-us"
    });
  }
}
