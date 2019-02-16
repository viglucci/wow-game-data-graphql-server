import { Container, inject, injectable } from "inversify";
import {
  autoProvide,
  buildProviderModule,
  provide,
  fluentProvide
} from "inversify-binding-decorators";

let container = new Container({
  autoBindInjectable: true,
  defaultScope: "Singleton",
  skipBaseClassChecks: true
});

container.load(buildProviderModule());

let provideNamed = function(identifier, name) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
};

export { container, autoProvide, provide, provideNamed, inject, injectable };
