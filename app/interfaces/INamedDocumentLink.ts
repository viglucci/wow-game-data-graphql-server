import IDocumentLink from "./IDocumentLink";

export default interface INamedDocumentLink {
  key: IDocumentLink;
  id: number;
  name: string;
  slug: string;
}
