import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystonePeriodResolver {
  getDefinition() {
    return {
      Query: {
        mythicKeystonePeriods: this.getMythicKeystonePeriods.bind(this),
        mythicKeystonePeriodById: this.getMythicKeystonePeriod.bind(this),
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
    period: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystonePeriods();
  }

  private getMythicKeystonePeriod(
    period: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystonePeriodById(id);
  }

  private getCurrentMythicKeystonePeriod(
    period: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.currentMythicKeystonePeriod();
  }

  private getStartTimestamp(root: any) {
    return root.start_timestamp / 1000;
  }

  private getEndTimestamp(root: any) {
    return root.end_timestamp / 1000;
  }
}
