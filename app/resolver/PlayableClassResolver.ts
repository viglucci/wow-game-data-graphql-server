import { injectable } from "../ioc/ioc";

@injectable()
export default class PlayableClassResolver {
  getDefinition() {
    return {
      Query: {
        classes: async (root, args, { dataSources }) => {
          return await dataSources.classes.getAllClasses();
        },
        class: async (root, { id }, { dataSources }) => {
          return await dataSources.classes.getClass(id);
        }
      }
    };
  }
}
