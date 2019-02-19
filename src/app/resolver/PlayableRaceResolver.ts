import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import IQueryInput from '../../interfaces/IQueryInput';
import IByIdInput from '../../interfaces/IByIdInput';

@injectable()
export default class PlayableRaceResolver {
  public getDefinition() {
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
    args: IQueryInput<IByIdInput>,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return await dataSources.races.raceById(args.input.id);
  }

  private getGenderedName(race: any) {
    return race.gender_name;
  }
}
