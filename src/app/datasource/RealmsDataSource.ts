import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../../interfaces/INamedDocumentLink";
import IDocumentLink from "../../interfaces/IDocumentLink";

@injectable()
export default class RealmsDataSource extends GameDataAPIDataSource {
  public async getAllConnectedRealms(): Promise<any> {
    const index = await this.getResource("/connected-realm/index", {
      namespace: "dynamic-us"
    });
    const individualFetches = index.connected_realms.map(
      async (documentLink: IDocumentLink) => {
        return this.getResource(documentLink.href);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async getConnectedRealmByKey(key: IDocumentLink): Promise<any> {
    return await this.getResource(key.href, {
      namespace: "dynamic-us"
    });
  }

  public async connectedRealmById(id: string): Promise<any> {
    return await this.getResource(`/connected-realm/${id}`, {
      namespace: "dynamic-us"
    });
  }

  public async getAllRealms(): Promise<any> {
    const index = await this.getResource("/realm/index", {
      namespace: "dynamic-us"
    });
    const individualFetches = index.realms.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async realmById(id: string): Promise<any> {
    return await this.getResource(`/realm/${id}`, {
      namespace: "dynamic-us"
    });
  }
}
