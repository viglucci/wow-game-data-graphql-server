import { injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class MythicKeystoneDungeonResolver {
  getDefinition() {
    return {
      Query: {
        mythicKeystoneDungeon: this.getMythicKeystoneDungeon.bind(this),
        mythicKeystoneDungeons: this.getMythicKeystoneDungeons.bind(this)
      }
    };
  }

  private getMythicKeystoneDungeons(
    period: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystoneDungeon.getMythicKeystoneDungeons();
  }

  private getMythicKeystoneDungeon(
    period: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystoneDungeon.getMythicKeystoneDungeonById(id);
  }
}
