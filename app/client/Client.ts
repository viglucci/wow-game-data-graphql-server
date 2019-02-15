import { inject, injectable } from "../ioc/ioc";
import "reflect-metadata";
import OAuthTokenManager from "./OAuthTokenManager";

@injectable()
class Client {
  @inject(OAuthTokenManager)
  private tokenManager: OAuthTokenManager;

  get() {
    const token = this.tokenManager.getToken();
    console.log(token);
  }
}

export { Client };
