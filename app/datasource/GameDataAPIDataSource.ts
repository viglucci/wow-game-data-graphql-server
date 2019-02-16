import {
  RequestOptions,
  RESTDataSource,
  Response
} from "apollo-datasource-rest";
import { inject, injectable } from "inversify";
import OAuthTokenManager from "../oauth/OAuthTokenManager";

@injectable()
export default class GameDataAPIDataSource extends RESTDataSource {
  @inject(OAuthTokenManager)
  protected tokenManager: OAuthTokenManager;

  public baseURL = "https://us.api.blizzard.com/data/wow/";

  constructor() {
    super();
  }

  async willSendRequest(request: RequestOptions): Promise<void> {
    const token = await this.tokenManager.getToken();
    request.headers.set("Authorization", `Bearer ${token.access_token}`);
  }

  getResource(path: string, params?: any): Promise<Response> {
    return this.get(path, params);
  }
}
