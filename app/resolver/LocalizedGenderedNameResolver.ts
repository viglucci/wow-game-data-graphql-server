import { injectable, inject } from "../ioc/ioc";

@injectable()
export default class LocalizedGenderedNameResolver {
  getDefinition() {
    return {
      LocalizedGenderedName: {
        male: (name: any) => name.male_name,
        female: (name: any) => name.female_name
      }
    };
  }
}
