import { inject } from "../../../ioc/ioc";
import { controller, httpGet } from "inversify-express-utils";
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import HelloService from "../../../service/HelloService";

@ApiPath({
  path: "/api/hello",
  name: "Hello API"
})
@controller("/api/hello")
export default class HelloController {
  @inject(HelloService)
  private helloService: HelloService;

  @ApiOperationGet({
    path: "/",
    description: "Retrieve the string 'hello world'",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY
      }
    }
  })
  @httpGet("/")
  public getAll(): string {
    return this.helloService.getHello();
  }
}
