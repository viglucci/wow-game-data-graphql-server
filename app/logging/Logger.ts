import bunyan from "bunyan";
import { injectable, inject } from "inversify";
import ConfigManager from "../config/Config";

@injectable()
export default class Logger {
  private logger: bunyan;

  constructor(
    @inject(ConfigManager)
    configManager: ConfigManager
  ) {
    this.logger = bunyan.createLogger({
      name: "app",
      level: configManager.get("logging.level")
    });
  }

  info(object: any, message?: string) {
    this.logger.info(object, message);
  }

  error(object: any, message?: string) {
    this.logger.error(object, message);
  }

  warn(object: any, message?: string) {
    this.logger.warn(object, message);
  }

  debug(object: any, message?: string) {
    this.logger.debug(object, message);
  }
}