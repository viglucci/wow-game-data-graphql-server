import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";

export default class IntlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args: any[]) {
      const context = args[2];
      const localizedMap = await resolve.apply(this, args);
      return localizedMap[context.locale];
    };
  }
}
