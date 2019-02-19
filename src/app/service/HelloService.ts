import { injectable } from '../ioc/ioc';

@injectable()
export default class HelloService {
  public getHello() {
    return 'hello world';
  }
}
