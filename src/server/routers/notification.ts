import { t } from "../trpc";
import { prisma } from "../../db/prisma";
import { z } from "zod";
import { NotificationTypeSchema } from "../../../types";

export const notificationRouter = t.router({
  getAll: t.procedure.query(async () => {
    return prisma.notification.findMany({ orderBy: { createdAt: "desc" } });
  }),
  create: t.procedure
    .input(NotificationTypeSchema)
    .mutation(async ({ input }) => {
      return prisma.notification.create({
        data: input,
      });
    }),
  markAsRead: t.procedure.input(z.number()).mutation(async ({ input }) => {
    return prisma.notification.update({
      where: { id: input },
      data: { isRead: true },
    });
  }),
});
