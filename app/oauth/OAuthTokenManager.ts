import { injectable, inject } from "../ioc/ioc";
import { create, OAuthClient, AccessToken } from "simple-oauth2";
import ConfigManager from "../config/Config";

@injectable()
export default class OAuthTokenManager {
  private oauth2: OAuthClient;
  private configManager: ConfigManager;
  private token: AccessToken;

  constructor(
    @inject(ConfigManager)
    configManager: ConfigManager
  ) {
    this.configManager = configManager;
    this.oauth2 = create({
      client: {
        id: this.configManager.get("oauth.client_id"),
        secret: this.configManager.get("oauth.client_secret")
      },
      auth: {
        tokenHost: this.configManager.get("oauth.auth.tokenHost")
      }
    });
  }

  async getToken() {
    if (this.token && !this.token.expired()) {
      return this.token.token;
    } else {
      const getTokenResponse = await this.oauth2.clientCredentials.getToken({});
      const accessToken = this.oauth2.accessToken.create(getTokenResponse);
      this.token = accessToken;
      return accessToken.token;
    }
  }
}
