import { z } from "zod";
import { publicProcedure, router } from "../utils/trpc";
import {
  createUser,
  findUserById,
  findUsers,
  loginUser,
} from "./userController";

export const UserRouter = router({
  users: publicProcedure.query(async () => {
    return await findUsers();
  }),

  userById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await findUserById(input);
  }),

  createUser: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input }) => {
      return await createUser(input);
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await loginUser(input);
    }),
});

export type UserRouter = typeof UserRouter;
