import { injectable } from 'inversify';

@injectable()
export default class ConnectedRealmMapper {
  getHasQueue(connectedRealm: any) {
    return connectedRealm.has_queue;
  }
}
