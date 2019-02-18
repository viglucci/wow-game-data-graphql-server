import { injectable } from "inversify";
import IDataSources from "../../interfaces/IDataSources";

@injectable()
export default class MythicKeystoneDungeonResolver {
  getDefinition() {
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
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystoneDungeon.mythicKeystoneDungeonById(id);
  }
}
