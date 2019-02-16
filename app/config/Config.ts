import { injectable } from "../ioc/ioc";
import config from "config";

@injectable()
export default class ConfigManager {
  get(key: string): any {
    return config.get(key);
  }
}
