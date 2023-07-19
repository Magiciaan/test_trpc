import { UserRouter } from "../users/userRouter";
import { router } from "../utils/trpc";

export const appRouter = router({
  user: UserRouter, // put procedures under "user" namespace
  //   post: postRouter, // put procedures under "post" namespace
});
