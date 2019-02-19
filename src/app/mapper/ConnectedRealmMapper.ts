import { injectable } from 'inversify';

@injectable()
export default class ConnectedRealmMapper {
  public getHasQueue(connectedRealm: any) {
    return connectedRealm.has_queue;
  }
}
