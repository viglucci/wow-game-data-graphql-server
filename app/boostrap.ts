import "reflect-metadata"; // must come first!
import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as path from "path";
import * as swagger from "swagger-express-ts";
import { importSchema } from "graphql-import";
import ResolverMapFactory from "./resolver/ResolverMapFactory";

import "./ioc/loader";
import { container } from "./ioc/ioc";

let server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.set("view engine", "pug");
  app.set("views", path.resolve(`${__dirname}/../resources/views`));

  const swaggerUiPath = path.resolve(`${__dirname}/../public/swagger`);
  const swaggerUiAssetsPath = path.resolve(
    `${__dirname}/../node_modules/swagger-ui-dist`
  );

  app.use("/api-docs/swagger", express.static(swaggerUiPath));
  app.use("/api-docs/swagger/assets", express.static(swaggerUiAssetsPath));
  app.use(
    swagger.express({
      definition: {
        info: {
          title: process.env.npm_package_name,
          version: process.env.npm_package_version
        }
        // Models can be defined here
      }
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(bodyParser.json());

  const typeDefs = importSchema(`${__dirname}/graphql/schema.graphql`);
  // Provide resolver functions for your schema fields
  const resolverMap = ResolverMapFactory.makeMap();

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolverMap,
    introspection: true,
    playground: true
  });

  server.applyMiddleware({
    app,
    path: "/graphql"
  });
});

server.setErrorConfig((app: any) => {
  app.use(
    (
      error: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      console.error(error.stack);
      response.status(500).send("Something broke!");
    }
  );
});

let serverInstance = server.build();

export default serverInstance;
