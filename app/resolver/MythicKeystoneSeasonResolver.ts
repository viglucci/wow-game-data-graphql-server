import { injectable } from "inversify";
import IDataSources from "../interfaces/IDataSources";

@injectable()
export default class MythicKeystoneSeasonResolver {
  getDefinition() {
    return {
      Query: {
        mythicKeystoneSeasons: this.getMythicKeystoneSeasons.bind(this),
        mythicKeystoneSeason: this.getMythicKeystoneSeason.bind(this),
        currentMythicKeystoneSeason: this.getCurrentMythicKeystoneSeason.bind(
          this
        )
      },
      MythicKeystoneSeason: {
        startTimestamp: this.getStartTimestamp.bind(this),
        endTimestamp: this.getEndTimestamp.bind(this),
        periods: this.getMythicKeystonePeriodsForSeason.bind(this)
      }
    };
  }

  private getMythicKeystoneSeasons(
    season: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getMythicKeystoneSeasons();
  }

  private getMythicKeystoneSeason(
    season: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getMythicKeystoneSeasonById(id);
  }

  private getCurrentMythicKeystoneSeason(
    season: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getCurrentMythicKeystoneSeason();
  }

  private getMythicKeystonePeriodsForSeason(
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
