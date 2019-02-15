import { provide } from "inversify-binding-decorators";

@provide(HelloResolver)
export default class HelloResolver {
  getDefinition() {
    return {
      hello: this.resolveHello
    };
  }

  resolveHello() {
    return "hello world";
  }
}
