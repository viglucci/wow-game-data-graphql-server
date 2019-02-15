import { injectable } from "../ioc/ioc";

@injectable()
export default class HelloResolver {
  getDefinition() {
    return {
      Query: {
        hello: () => "hello world"
      }
    };
  }
}
