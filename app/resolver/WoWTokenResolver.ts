import { injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class WoWTokenResolver {
  getDefinition() {
    return {
      Query: {
        token: this.getWoWToken.bind(this)
      },
      WoWToken: {
        lastUpdatedTimestamp: this.getLastUpdatedTimestamp.bind(this)
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

  private async getLastUpdatedTimestamp(token: any, args: any, ctx: any) {
    return token.last_updated_timestamp / 1000;
  }
}
