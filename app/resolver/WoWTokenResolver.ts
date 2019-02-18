import IDataSources from "../interfaces/IDataSources";
import { injectable } from "../ioc/ioc";

@injectable()
export default class WoWTokenResolver {
  getDefinition() {
    return {
      Query: {
        token: this.getWoWToken.bind(this)
      },
      WoWToken: {
        lastUpdatedTimestampSeconds: this.getLastUpdatedTimeSeconds.bind(this)
      }
    };
  }

  private async getWoWToken(
    root: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.token.getWoWToken();
  }

  private async getLastUpdatedTimeSeconds(token: any, args: any, ctx: any) {
    return token.last_updated_timestamp / 1000;
  }
}
