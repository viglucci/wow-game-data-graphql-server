import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../interfaces/INamedDocumentLink";

@injectable()
export default class MythicKeystoneDataSource extends GameDataAPIDataSource {
  public async getCurrentMythicKeystonePeriod(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/period/index`, {
      namespace: "dynamic-us"
    });
    return this.getResource(index.current_period.key);
  }

  public async getMythicKeystonePeriods(): Promise<any> {
    const index = await this.getResource(`/mythic-keystone/period/index`, {
      namespace: "dynamic-us"
    });
    const individualFetches = index.periods.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async getMythicKeystonePeriodById(id: string): Promise<any> {
    return await this.getResource(`/mythic-keystone/period/${id}`, {
      namespace: "dynamic-us"
    });
  }
}
