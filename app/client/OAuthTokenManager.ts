import { injectable, inject } from "../ioc/ioc";
import { create, OAuthClient } from "simple-oauth2";
import ConfigManager from "../config/Config";

@injectable()
export default class OAuthTokenManager {
  private oauth2: OAuthClient;
  private configManager: ConfigManager;

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
    const result = await this.oauth2.clientCredentials.getToken({});
    const accessToken = this.oauth2.accessToken.create(result);
    return accessToken;
  }
}
