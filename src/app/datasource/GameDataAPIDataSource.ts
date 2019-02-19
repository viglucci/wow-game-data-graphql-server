import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { inject, injectable } from 'inversify';
import OAuthTokenManager from '../oauth/OAuthTokenManager';
import IDocumentLink from '../../interfaces/IDocumentLink';
import Logger from '../logging/Logger';
import ConfigManager from '../config/Config';

@injectable()
export default abstract class GameDataAPIDataSource extends RESTDataSource {

  public basePath = 'data/wow/';
  public baseURL = 'https://us.api.blizzard.com/data/wow/';
  @inject(OAuthTokenManager)
  protected tokenManager: OAuthTokenManager;

  @inject(ConfigManager)
  protected configManager: ConfigManager;

  @inject(Logger)
  protected logger: Logger;

  private defaultRegion: string;
  private regionToHostMap: any;
  private regionalNamespaceMap: any;

  constructor(
    @inject(ConfigManager)
    configManager: ConfigManager
  ) {
    super();
    this.defaultRegion = configManager.get('datasources.gdapi.defaultRegion');
    this.regionToHostMap = configManager.get('datasources.gdapi.hosts');
    this.regionalNamespaceMap = configManager.get(
      'datasources.gdapi.namespaces'
    );
  }

  public async resolveURL(request: RequestOptions) {
    let region = request.params.get('region');
    if (region) {
      request.params.delete('region');
    } else {
      region = this.defaultRegion;
    }
    region = region.toLocaleLowerCase();
    this.baseURL = this.regionToHostMap[region] + this.basePath;

    // only map namespace if it is explicetly set on params
    // otherwise assume that we are resolving a link that already
    // has the namespace included
    let namespace = request.params.get('namespace');
    if (namespace) {
      request.params.delete('namespace');
      let regionalNamespaceMap = this.regionalNamespaceMap[
        namespace.toLocaleLowerCase()
      ];
      request.params.set('namespace', regionalNamespaceMap[region]);
    }

    return super.resolveURL(request);
  }

  public async willSendRequest(request: RequestOptions): Promise<void> {
    const token = await this.tokenManager.getToken();
    request.headers.set('Authorization', `Bearer ${token.access_token}`);
  }

  public getResource(
    pathOrDocumentLink: string | IDocumentLink,
    params?: any
  ): Promise<any> {
    let resourcePath: string;
    if (typeof pathOrDocumentLink === 'string') {
      resourcePath = pathOrDocumentLink;
    } else {
      resourcePath = pathOrDocumentLink.href;
    }
    return this.get(resourcePath, params, {
      cacheOptions: {
        ttl: 60 * 5
      }
    });
  }

  public combineParams(paramsA?: any, paramsB?: any) {
    if (!paramsA) {
      paramsA = {};
    }
    if (!paramsB) {
      paramsB = {};
    }
    return {
      ...paramsA,
      ...paramsB
    };
  }
}
