import { injectable, inject } from 'inversify';
import IDataSources from '../../interfaces/IDataSources';
import Logger from '../logging/Logger';

@injectable()
export default class GuildResolver {
  @inject(Logger)
  private logger: Logger;

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
    let realm = null;
    try {
      realm = await ctx.dataSources.realms.getRealmBySlug(guild.realm.slug, {
        region: guild.region
      });
    } catch (err) {
      this.logger.error(
        { err: err.extensions },
        'Failed to resolve realm for guild.'
      );
    }
    return realm;
  }
}
