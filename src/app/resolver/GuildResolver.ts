import { injectable } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';

@injectable()
export default class GuildResolver {
  public getDefinition() {
    return {
      Guild: {
        realm: this.getRealmFromGuild.bind(this)
      }
    };
  }

  protected async getRealmFromGuild(
    guild: any,
    args: any,
    ctx: { dataSources: IDataSources }
  ): Promise<any> {
    return ctx.dataSources.realms.getRealmBySlug(guild.realm.slug, {
      region: guild.region
    });
  }
}
