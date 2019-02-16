import { injectable } from "../ioc/ioc";
import * as config from "config";

@injectable()
export default class ConfigManager {
  get(key): any {
    return config.get(key);
  }
}
