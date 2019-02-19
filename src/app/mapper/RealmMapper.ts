import { injectable } from 'inversify';

@injectable()
export default class RealmMapper {
  getIsTournamentRealm(realm: any) {
    return realm.is_tournament;
  }
}
