import { inject } from "../../../ioc/ioc";
import { controller, httpGet } from "inversify-express-utils";
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import HelloService from "../../../service/HelloService";
import OAuthTokenManager from "../../../client/OAuthTokenManager";

@ApiPath({
  path: "/api/hello",
  name: "Hello API"
})
@controller("/api/hello")
export default class HelloController {
  @inject(HelloService)
  private helloService: HelloService;

  @inject(OAuthTokenManager)
  private tokenManager: OAuthTokenManager;

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
  public async getAll(): Promise<any> {
    const token = await this.tokenManager.getToken();
    console.log(token);
    return this.helloService.getHello();
  }
}
