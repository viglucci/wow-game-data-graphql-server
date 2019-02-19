import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

@injectable()
export default class MythicKeystonePeriodResolver {
  public getDefinition() {
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
    args: IQueryInput<IByIdInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystonePeriodById(args.input.id);
  }

  private getCurrentMythicKeystonePeriod(
    period: any,
    args: IQueryInput<IByIdInput>,
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
