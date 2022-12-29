import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import bodyParser from "express";
import cors from "cors";
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolver/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

interface MyContext {
  token?: String;
}

const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// connection with DB
try {
  await connectDB();
  console.log("🟢 Connection with Database is Successful");
} catch (e) {
  console.log("🔴 Not Connected to Database");
}

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
