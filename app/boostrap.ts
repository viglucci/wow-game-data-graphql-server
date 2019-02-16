import "reflect-metadata"; // must come first!
import { ApolloServer, gql } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import { importSchema } from "graphql-import";
import { InversifyExpressServer } from "inversify-express-utils";
import * as path from "path";
import * as swagger from "swagger-express-ts";
import { container } from "./ioc/ioc";
import "./ioc/loader";
import ResolverMapFactory from "./resolver/ResolverMapFactory";
import RacesDataSource from "./datasource/RacesDataSource";

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

  const schema = importSchema(`${__dirname}/graphql/schema.graphql`);
  const typeDefs = gql`
    ${schema}
  `;

  // Provide resolver functions for your schema fields
  const resolverMapFactory = container.get(ResolverMapFactory);
  const resolverMap = resolverMapFactory.makeMap();

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolverMap,
    dataSources: () => {
      const dataSources = {
        racesAPI: container.get(RacesDataSource)
      };
      return dataSources;
    },
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
