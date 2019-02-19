import bunyan from 'bunyan';
import { injectable, inject } from 'inversify';
import ConfigManager from '../config/Config';

@injectable()
export default class Logger {
  private logger: bunyan;

  constructor(
    @inject(ConfigManager)
    configManager: ConfigManager
  ) {
    this.logger = bunyan.createLogger({
      name: 'app',
      level: configManager.get('logging.level')
    });
  }

  public info(object: any, message?: string) {
    if (!message) {
      message = object;
      object = null;
    }
    this.logger.info(object, message);
  }

  public error(object: any, message?: string) {
    if (!message) {
      message = object;
      object = null;
    }
    this.logger.error(object, message);
  }

  public warn(object: any, message?: string) {
    if (!message) {
      message = object;
      object = null;
    }
    this.logger.warn(object, message);
  }

  public debug(object: any, message?: string) {
    if (!message) {
      message = object;
      object = null;
    }
    this.logger.debug(object, message);
  }
}
