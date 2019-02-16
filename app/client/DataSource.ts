import { RESTDataSource } from "apollo-datasource-rest";

export default class DataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://us.api.blizzard.com/data/wow/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }
}
