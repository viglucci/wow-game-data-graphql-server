import { injectable } from '../ioc/ioc';
import GameDataAPIDataSource from './GameDataAPIDataSource';

@injectable()
export default class WoWTokenDataSource extends GameDataAPIDataSource {
  public async wowToken(region: string): Promise<any> {
    return await this.getResource(`/token/index`, {
      region,
      namespace: 'DYNAMIC'
    });
  }
}
