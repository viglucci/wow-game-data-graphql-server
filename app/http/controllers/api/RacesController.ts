import { inject } from "../../../ioc/ioc";
import { controller, httpGet } from "inversify-express-utils";
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import RacesDataSource from "../../../datasource/RacesDataSource";

@ApiPath({
  path: "/api/races",
  name: "Races API"
})
@controller("/api/races")
export default class RacesController {
  @inject(RacesDataSource)
  private racesDataSource: RacesDataSource;

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
    return this.racesDataSource.getAllRaces();
  }
}
