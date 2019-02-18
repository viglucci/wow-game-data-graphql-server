import { injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class MythicKeystoneResolver {
  getDefinition() {
    return {
      Query: {
        mythicKeystonePeriods: this.getMythicKeystonePeriods.bind(this),
        mythicKeystonePeriod: this.getMythicKeystonePeriod.bind(this),
        currentMythicKeystonePeriod: this.getCurrentMythicKeystonePeriod.bind(
          this
        )
      },
      MythicKeystonePeriod: {
        startTimestamp: this.getStartTimestamp.bind(this),
        endTimestamp: this.getEndTimestamp.bind(this)
      }
    };
  }

  private getMythicKeystonePeriods(
    connectedRealm: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getMythicKeystonePeriods();
  }

  private getMythicKeystonePeriod(
    connectedRealm: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {}

  private getCurrentMythicKeystonePeriod(
    connectedRealm: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getCurrentMythicKeystonePeriod();
  }

  private getStartTimestamp(period: any) {
    return period.start_timestamp / 1000;
  }

  private getEndTimestamp(period: any) {
    return period.end_timestamp / 1000;
  }
}
