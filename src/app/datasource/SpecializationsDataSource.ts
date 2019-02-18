import { injectable } from "../ioc/ioc";
import GameDataAPIDataSource from "./GameDataAPIDataSource";
import INamedDocumentLink from "../../interfaces/INamedDocumentLink";

@injectable()
export default class SpecializationsDataSource extends GameDataAPIDataSource {
  public async getAllSpecializations(): Promise<any> {
    const index = await this.getResource("/playable-specialization/index", {
      namespace: "static-us"
    });
    const individualFetches = index.character_specializations.map(
      async (documentLink: INamedDocumentLink) => {
        return this.getResource(documentLink.key);
      }
    );
    return await Promise.all(individualFetches);
  }

  public async specializationById(id: string): Promise<any> {
    return await this.getResource(`/playable-specialization/${id}`, {
      namespace: "static-us"
    });
  }
}
