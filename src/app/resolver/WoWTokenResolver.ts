import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IWoWTokenQueryInput from '../../interfaces/IWoWTokenQueryInput';

@injectable()
export default class WoWTokenResolver {
  public getDefinition() {
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
    args: IQueryInput<IWoWTokenQueryInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.token.wowToken(args.input.region);
  }

  private async getLastUpdatedTimestamp(token: any, args: any, ctx: any) {
    return token.last_updated_timestamp / 1000;
  }
}
