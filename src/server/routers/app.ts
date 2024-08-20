import { t } from "../trpc";
import { notificationRouter } from "./notification";

export const appRouter = t.router({
  notifications: notificationRouter,
  // Add other routers here
});

export type AppRouter = typeof appRouter;
