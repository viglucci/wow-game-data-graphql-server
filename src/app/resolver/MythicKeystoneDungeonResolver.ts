import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

@injectable()
export default class MythicKeystoneDungeonResolver {
  public getDefinition() {
    return {
      Query: {
        mythicKeystoneDungeons: this.getMythicKeystoneDungeons.bind(this),
        mythicKeystoneDungeonById: this.getMythicKeystoneDungeon.bind(this)
      }
    };
  }

  private getMythicKeystoneDungeons(
    period: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystoneDungeon.mythicKeystoneDungeons();
  }

  private getMythicKeystoneDungeon(
    period: any,
    args: IQueryInput<IByIdInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystoneDungeon.mythicKeystoneDungeonById(
      args.input.id
    );
  }
}
