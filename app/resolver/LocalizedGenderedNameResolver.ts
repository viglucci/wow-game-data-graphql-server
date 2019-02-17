import { injectable, inject } from "../ioc/ioc";

@injectable()
export default class LocalizedGenderedNameResolver {
  getDefinition() {
    return {
      LocalizedGenderedName: {
        male: (name: any) => {
          if (name.male) {
            return name.male;
          } else {
            return name.male_name;
          }
        },
        female: (name: any) => {
          if (name.female) {
            return name.female;
          } else {
            return name.female_name;
          }
        }
      }
    };
  }
}
