import { injectable } from "../ioc/ioc";

@injectable()
export default class HelloService {
  getHello() {
    return "hello world";
  }
}
