import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import IDocumentLink from "../interfaces/IDocumentLink";
import INamedDocumentLink from "../interfaces/INamedDocumentLink";

@injectable()
export default class ClassesDataSource extends GameDataAPIDataSource {
  public async getAllClasses(): Promise<any> {
    const index = await this.getResource("/playable-class/index", {
      namespace: "static-us"
    });
    const individualFetches = index.classes.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key.href);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async getClassById(id: string): Promise<any> {
    return await this.getResource(`/playable-class/${id}`, {
      namespace: "static-us"
    });
  }
}
