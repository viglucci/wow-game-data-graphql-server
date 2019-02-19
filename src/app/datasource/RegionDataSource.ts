import { injectable } from '../ioc/ioc';
import GameDataAPIDataSource from './GameDataAPIDataSource';

@injectable()
export default class RegionDataSource extends GameDataAPIDataSource {
  public async regionById(id: string): Promise<any> {
    return await this.getResource(`/region/${id}`, {
      namespace: 'DYNAMIC'
    });
  }
}
