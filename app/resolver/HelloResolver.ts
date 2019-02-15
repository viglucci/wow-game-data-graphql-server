import { provide } from "inversify-binding-decorators";

@provide(HelloResolver)
export default class HelloResolver {
  getDefinition() {
    return {
      Query: {
        hello: () => "hello world"
      }
    };
  }

  resolveHello() {
    return "hello world";
  }
}
