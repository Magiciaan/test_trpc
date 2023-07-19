import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { UserRouter } from "../server/users/userRouter";

const trpc = createTRPCProxyClient<UserRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const allUsers = await trpc.users.query();

const user = await trpc.userById.query("7fafd037-407a-4f8c-aebf-2e5e593dddb4");

const createdUser = await trpc.createUser.mutate({
  name: "God",
  email: "string",
  password: "",
});

console.log(createdUser, allUsers, user);
