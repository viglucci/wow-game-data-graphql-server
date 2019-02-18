import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../../interfaces/INamedDocumentLink";
import IDocumentLink from "../../interfaces/IDocumentLink";

@injectable()
export default class RealmsDataSource extends GameDataAPIDataSource {
  public async getAllConnectedRealms(): Promise<any> {
    const index = await this.getResource("/connected-realm/index", {
      namespace: "DYNAMIC"
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
      namespace: "DYNAMIC"
    });
  }

  public async connectedRealmById(id: string): Promise<any> {
    return await this.getResource(`/connected-realm/${id}`, {
      namespace: "DYNAMIC"
    });
  }

  public async getAllRealms(): Promise<any> {
    const index = await this.getResource("/realm/index", {
      namespace: "DYNAMIC"
    });
    const individualFetches = index.realms.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async getRealmBySlug(slug: string, params?: any): Promise<any> {
    return await this.getResource(
      `/realm/${slug}`,
      this.combineParams(params, {
        namespace: "DYNAMIC"
      })
    );
  }
}
