import { ApolloServer, gql } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { importSchema } from 'graphql-import';
import { InversifyExpressServer } from 'inversify-express-utils';
import locale from 'locale';
import * as path from 'path';
import * as swagger from 'swagger-express-ts';
import ConfigManager from './app/config/Config';
import ClassesDataSource from './app/datasource/ClassesDataSource';
import DocumentDataSource from './app/datasource/DocumentDataSource';
import MythicKeystoneDataSource from './app/datasource/MythicKeystoneDataSource';
import MythicKeystoneDungeonDataSource from './app/datasource/MythicKeystoneDungeonDataSource';
import MythicRaidLeaderboardDataSource from './app/datasource/MythicRaidLeaderboardDataSource';
import PowerTypesDataSource from './app/datasource/PowerTypesDataSource';
import RacesDataSource from './app/datasource/RacesDataSource';
import RealmsDataSource from './app/datasource/RealmsDataSource';
import SpecializationsDataSource from './app/datasource/SpecializationsDataSource';
import WoWTokenDataSource from './app/datasource/WoWTokenDataSource';
import IntlDirective from './app/directive/IntlDirective';
import { container } from './app/ioc/ioc';
import './app/ioc/loader';
import Logger from './app/logging/Logger';
import ResolverMapFactory from './app/resolver/ResolverMapFactory';
import IDataSources from './interfaces/IDataSources';
import responseTime from 'response-time';
import RegionDataSource from './app/datasource/RegionDataSource';

let server = new InversifyExpressServer(container);

server.setConfig(app => {
  const configManager = container.get(ConfigManager);
  const logger = container.get(Logger);

  app.set('view engine', 'pug');
  app.set('views', path.resolve(`${__dirname}/../resources/views`));

  const swaggerUiPath = path.resolve(`${__dirname}/../public/swagger`);
  const swaggerUiAssetsPath = path.resolve(
    `${__dirname}/../node_modules/swagger-ui-dist`
  );

  app.use(responseTime());

  app.use('/api-docs/swagger', express.static(swaggerUiPath));
  app.use('/api-docs/swagger/assets', express.static(swaggerUiAssetsPath));
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

  const supportedLocales = configManager.get('locales.supported');
  const defaultLocale = configManager.get('locales.default');
  app.use(locale(supportedLocales, defaultLocale));

  logger.debug('Starting graphql schema compilation');
  const schema = importSchema(`${__dirname}/../graphql/schema.graphql`);
  const typeDefs = gql`
    ${schema}
  `;
  logger.debug('Completed graphql schema compilation');

  // Provide resolver functions for your schema fields
  const resolverMapFactory = container.get(ResolverMapFactory);
  const resolverMap = resolverMapFactory.makeMap();

  const dataSourcesFactory = (): IDataSources => {
    const dataSources: IDataSources = {
      document: container.get(DocumentDataSource),
      races: container.get(RacesDataSource),
      realms: container.get(RealmsDataSource),
      classes: container.get(ClassesDataSource),
      specializations: container.get(SpecializationsDataSource),
      powerTypes: container.get(PowerTypesDataSource),
      token: container.get(WoWTokenDataSource),
      mythicRaidLeaderboards: container.get(MythicRaidLeaderboardDataSource),
      mythicKeystone: container.get(MythicKeystoneDataSource),
      mythicKeystoneDungeon: container.get(MythicKeystoneDungeonDataSource),
      region: container.get(RegionDataSource)
    };
    return dataSources;
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolverMap,
    dataSources: dataSourcesFactory,
    introspection: true,
    playground: true,
    schemaDirectives: {
      intl: IntlDirective
    },
    context: ({ req }: { req: any }) => {
      return {
        locale: req.locale
      };
    }
  });

  server.applyMiddleware({
    app,
    path: '/graphql'
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
      response.status(500).send('Something broke!');
    }
  );
});

let serverInstance = server.build();

export default serverInstance;
