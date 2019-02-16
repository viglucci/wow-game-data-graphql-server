import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import OAuthTokenManager from "../oauth/OAuthTokenManager";
import { decorate, inject, injectable } from "inversify";
decorate(injectable(), RESTDataSource);

@injectable()
export default class GameDataAPIDataSource extends RESTDataSource {
  @inject(OAuthTokenManager)
  protected tokenManager: OAuthTokenManager;

  public baseURL = "https://us.api.blizzard.com/data/wow/";

  public constructor() {
    super();
  }

  async willSendRequest(request: RequestOptions): Promise<void> {
    const token = await this.tokenManager.getToken();
    request.headers.set("Authorization", `Bearer ${token.access_token}`);
  }

  getResource(path: string, params?: any): Promise<any> {
    return this.get(path, params);
  }
}
