import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IWoWTokenFetchInput from '../../interfaces/IWoWTokenFetchInput';
import IFetchInput from '../../interfaces/IFetchInput';

@injectable()
export default class WoWTokenResolver {
  getDefinition() {
    return {
      Query: {
        wowToken: this.getWowToken.bind(this)
      },
      WoWToken: {
        lastUpdatedTimestamp: this.getLastUpdatedTimestamp.bind(this)
      }
    };
  }

  private async getWowToken(
    root: any,
    args: IFetchInput<IWoWTokenFetchInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.token.wowToken(args.input.region);
  }

  private async getLastUpdatedTimestamp(token: any, args: any, ctx: any) {
    return token.last_updated_timestamp / 1000;
  }
}
