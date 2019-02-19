import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystoneSeasonResolver {
  public getDefinition() {
    return {
      Query: {
        mythicKeystoneSeasons: this.mythicKeystoneSeasons.bind(this),
        mythicKeystoneSeasonById: this.getMythicKeystoneSeason.bind(this),
        currentMythicKeystoneSeason: this.currentMythicKeystoneSeason.bind(this)
      },
      MythicKeystoneSeason: {
        startTimestamp: this.getStartTimestamp.bind(this),
        endTimestamp: this.getEndTimestamp.bind(this),
        periods: this.mythicKeystonePeriodsForSeason.bind(this)
      }
    };
  }

  private mythicKeystoneSeasons(
    season: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystoneSeasons();
  }

  private getMythicKeystoneSeason(
    season: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.mythicKeystoneSeasonById(id);
  }

  private currentMythicKeystoneSeason(
    season: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.currentMythicKeystoneSeason();
  }

  private mythicKeystonePeriodsForSeason(
    season: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.resolveMythicKeystonePeriodLinks(
      season.periods
    );
  }

  private getStartTimestamp(root: any) {
    return root.start_timestamp / 1000;
  }

  private getEndTimestamp(root: any) {
    return root.end_timestamp / 1000;
  }
}
