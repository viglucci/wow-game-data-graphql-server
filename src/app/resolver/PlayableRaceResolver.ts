import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class PlayableRaceResolver {
  getDefinition() {
    return {
      Query: {
        races: this.getRaces.bind(this),
        raceById: this.getRaceById.bind(this)
      },
      PlayableRace: {
        genderName: this.getGenderedName.bind(this)
      }
    };
  }

  private async getRaces(
    race: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.races.getAllRaces();
  }

  private async getRaceById(
    race: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.races.raceById(id);
  }

  private getGenderedName(race: any) {
    return race.gender_name;
  }
}
