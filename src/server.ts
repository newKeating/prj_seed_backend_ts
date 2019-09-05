import "./env";
import { Options } from "graphql-yoga";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import { isAuthenticated } from "./middlewares";
import "./passport";
import { authenticateJwt } from "./passport";
import { uploadMiddleware, uploadController } from "./upload";
import bodyParser from "body-parser";

const PORT: number | string = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(helmet());
server.express.use(
  cors({ credentials: true, origin: ["http://localhost:3000"] })
);
server.express.use(bodyParser.json());
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

const options: Options = {
  port: PORT,
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"]
  }
};

const handleAppStart = () =>
  console.log(`✅ Server running on http://localhost:${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    server.start(options, handleAppStart);
  })
  .catch(error => console.log(error));
