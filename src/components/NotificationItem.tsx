import React from "react";
import { NotificationType } from "../../types";
import { DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { InfoCircledIcon, AvatarIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

export default function NotificationItem({
  createdAt,
  id,
  isRead,
  type,
  releaseNumber,
  sender,
  onClick,
}: {
  onClick: (e: NotificationType) => void;
} & NotificationType) {
  const ItemClick = () => {
    onClick({
      createdAt,
      id,
      isRead,
      type,
      releaseNumber,
      sender,
    });
  };
  let baseClass = "cusor-pointer px-4 py-2 flex flex-row items-center gap-1";
  switch (type) {
    case "Platform update":
      return (
        <DropdownMenu.Item
          onClick={ItemClick}
          className={clsx(!isRead && "bg-yellow-200")}
        >
          <div className={baseClass}>
            <InfoCircledIcon className="mr-2" /> New features - see what’s new
          </div>
        </DropdownMenu.Item>
      );
    case "Join workspace":
      return (
        <DropdownMenu.Item
          onClick={ItemClick}
          className={clsx(!isRead && "bg-red-200")}
        >
          <Link className={baseClass} href={`/workspace`}>
            <AvatarIcon className="mr-2" /> {sender} joined your workspace
          </Link>
        </DropdownMenu.Item>
      );
    case "Comment Tag":
      return (
        <DropdownMenu.Item
          onClick={ItemClick}
          className={clsx(!isRead && "bg-green-200")}
        >
          <Link className={baseClass} href={`/comments`}>
            <AvatarIcon className="pr-2" /> {sender} tagged you in a comment
          </Link>
        </DropdownMenu.Item>
      );
    case "Access granted":
      return (
        <DropdownMenu.Item
          onClick={ItemClick}
          className={clsx(!isRead && "bg-blue-200")}
        >
          <Link className={baseClass} href={`/chats`}>
            <AvatarIcon className="mr-2" /> {sender} shared a chat with you
          </Link>
        </DropdownMenu.Item>
      );
  }
}
