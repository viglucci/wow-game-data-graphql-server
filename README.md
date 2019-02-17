# wow-game-data-graphql-server
Experiment for exposing the public World of Warcraft game data API through a GraphQL interface.

## Install Dependencies

```
npm install
npm install -g nodemon
```

## Update your env variables

Create a .env file and set your Client ID and Client Secret from http://develop.battle.net

```bash
touch .env
```

```dotenv
CLIENT_ID=12345
CLIENT_SECRET=6789
```

## Run server + watch source

```
npm run dev
```

## Open in your browser

- Visit http://localhost:3000/ for the index page.
- Visit http://localhost:3000/graphql/ for a graphql playground page.
- Visit http://localhost:3000/api-docs/swagger/ for a swagger-ui example page.
