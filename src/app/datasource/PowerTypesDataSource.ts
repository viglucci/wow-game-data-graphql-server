import { injectable } from '../ioc/ioc';
import GameDataAPIDataSource from './GameDataAPIDataSource';
import INamedDocumentLink from '../../interfaces/INamedDocumentLink';

@injectable()
export default class PowerTypesDataSource extends GameDataAPIDataSource {
  public async getAllPowerTypes(): Promise<any> {
    const index = await this.getResource('/power-type/index', {
      namespace: 'STATIC'
    });
    const individualFetches = index.power_types.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key.href);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async powerTypeById(id: string): Promise<any> {
    return await this.getResource(`/power-type/${id}`, {
      namespace: 'STATIC'
    });
  }
}
