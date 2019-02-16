import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { inject, injectable } from "inversify";
import OAuthTokenManager from "../oauth/OAuthTokenManager";
import IDocumentLink from "../interfaces/IDocumentLink";

@injectable()
export default class GameDataAPIDataSource extends RESTDataSource {
  @inject(OAuthTokenManager)
  protected tokenManager: OAuthTokenManager;

  public baseURL = "https://us.api.blizzard.com/data/wow/";

  constructor() {
    super();
  }

  public async willSendRequest(request: RequestOptions): Promise<void> {
    const token = await this.tokenManager.getToken();
    request.headers.set("Authorization", `Bearer ${token.access_token}`);
  }

  public getResource(
    pathOrDocumentLink: string | IDocumentLink,
    params?: any
  ): Promise<any> {
    let resourcePath: string;
    if (typeof pathOrDocumentLink === "string") {
      resourcePath = pathOrDocumentLink;
    } else {
      resourcePath = pathOrDocumentLink.href;
    }
    return this.get(resourcePath, params);
  }
}
