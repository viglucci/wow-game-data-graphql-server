import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class MythicKeystoneLeaderboardGroupMemberResolver {
  public getDefinition() {
    return {
      MythicKeystoneLeaderboardGroupMember: {
        name: this.getName.bind(this),
        specialization: this.getSpecialization.bind(this),
        realm: this.getRealm.bind(this)
      }
    };
  }

  private getName(member: any, args: any, ctx: any) {
    return member.profile.name;
  }

  private async getSpecialization(
    member: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.mythicKeystone.getResource(member.specialization.key);
  }

  private async getRealm(
    member: any,
    args: any,
    { dataSources }: { dataSources: IDataSources }
  ) {
    return dataSources.realms.getResource(member.profile.realm.key);
  }
}
