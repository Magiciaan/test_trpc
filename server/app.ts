import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/routes";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

console.log("App listening to PORT 3000");
