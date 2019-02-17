import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../interfaces/INamedDocumentLink";

@injectable()
export default class DocumentDataSource extends GameDataAPIDataSource {
  public async getDocumentFromDocumentLink(documentLink: INamedDocumentLink) {
    return this.getResource(documentLink.key.href);
  }
}
