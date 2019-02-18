import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../../interfaces/INamedDocumentLink";

@injectable()
export default class MythicKeystoneDataSource extends GameDataAPIDataSource {
  public async mythicKeystoneSeasons(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/season/index`, {
      namespace: "DYNAMIC"
    });
    const individualFetches = index.seasons.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async mythicKeystoneSeasonById(id: string): Promise<any> {
    return await this.getResource(`/mythic-keystone/season/${id}`, {
      namespace: "DYNAMIC"
    });
  }

  public async currentMythicKeystoneSeason(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/period/index`, {
      namespace: "DYNAMIC"
    });
    return this.getResource(index.current_season.key);
  }

  public async resolveMythicKeystonePeriodLinks(periods: [any]): Promise<any> {
    const individualFetches = periods.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return Promise.all(individualFetches);
  }

  public async mythicKeystonePeriods(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/period/index`, {
      namespace: "DYNAMIC"
    });
    const individualFetches = index.periods.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async mythicKeystonePeriodById(id: string): Promise<any> {
    return await this.getResource(`/mythic-keystone/period/${id}`, {
      namespace: "DYNAMIC"
    });
  }

  public async currentMythicKeystonePeriod(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/period/index`, {
      namespace: "DYNAMIC"
    });
    return this.getResource(index.current_period.key);
  }
}
