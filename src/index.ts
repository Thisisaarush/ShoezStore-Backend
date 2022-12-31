import express from "express";
import bodyParser from "express";
import http from "http";
import cors from "cors";
import { PORT } from "./config/env.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { TApolloServer } from "./types/index.js";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<TApolloServer>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// middlewares
app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// listening on port 4000
await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);
