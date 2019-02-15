import { injectable } from "../ioc/ioc";
import { create, OAuthClient } from "simple-oauth2";

@injectable()
export default class OAuthTokenManager {
  private oauth2: OAuthClient;

  constructor() {
    this.oauth2 = create({
      client: {
        id: "<client-id>",
        secret: "<client-secret>"
      },
      auth: {
        tokenHost: ""
      }
    });
  }

  async getToken() {
    const result = await this.oauth2.clientCredentials.getToken({});
    const accessToken = this.oauth2.accessToken.create(result);
    return accessToken;
  }
}
