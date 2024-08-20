import { z } from "zod";

export type NotificationBaseType = {
  type: string;
  releaseNumber?: string | null;
  sender?: string | null;
};
export type NotificationType = NotificationBaseType & {
  id: number;
  createdAt: String;
  isRead: boolean;
};

export const typeArray: string[] = [
  "Join workspace",
  "Comment Tag",
  "Access granted",
  "Platform update",
];

export const NotificationTypeSchema: z.ZodType<NotificationBaseType> = z
  .object({
    type: z.enum(
      ["Join workspace", "Comment Tag", "Access granted", "Platform update"],
      {
        message: "Invalid notification type",
      }
    ),
    releaseNumber: z.string().optional(),
    sender: z.string(),
  })
  .refine(
    (data) => {
      if (data.type === "Platform update" && !data.releaseNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Release number is required for Platform update",
      path: ["releaseNumber"],
    }
  )
  .refine(
    (data) => {
      if (
        ["Join workspace", "Comment Tag", "Access granted"].includes(
          data.type
        ) &&
        !data.sender
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Sender is required for Join workspace, Comment Tag, and Access granted",
      path: ["sender"],
    }
  );
