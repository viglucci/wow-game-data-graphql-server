import config from 'config';
import { injectable } from 'inversify';

@injectable()
export default class ConfigManager {
  public get(key: string): any {
    return config.get(key);
  }
}
