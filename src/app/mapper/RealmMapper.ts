import { injectable } from 'inversify';

@injectable()
export default class RealmMapper {
  public getIsTournamentRealm(realm: any) {
    return realm.is_tournament;
  }
}
