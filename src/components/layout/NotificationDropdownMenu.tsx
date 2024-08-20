import { Button, DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { BellIcon, PlusIcon } from "@radix-ui/react-icons";
import { useNotification } from "@/context/NotificationContext";
import NotificationItem from "../NotificationItem";
import { NotificationType } from "../../../types";
import { trpc } from "../../utils/trpc";

interface NotificationDropdownMenuProps {
  notiCount: number;
  children?: React.ReactNode;
}

export default function NotificationDropdownMenu({
  notiCount,
}: NotificationDropdownMenuProps) {
  const [showNotification, setShowNotification] = React.useState(false);
  const { notifications, unreadCount, setShowAddForm, refetch } =
    useNotification();
  const notiMarkAsRead = trpc.notifications.markAsRead.useMutation();
  const clickToShowNotification = (open: boolean) => {
    setShowNotification(open);
  };

  const onAddNotification = () => {
    setShowAddForm(true);
  };

  const NotiItemClick = (data: NotificationType) => {
    switch (data.type) {
      case "Platform update":
        alert(data.releaseNumber);
      default: {
        notiMarkAsRead.mutateAsync(data.id).then((res: NotificationType) => {
          refetch();
        });
      }
    }
  };

  return (
    <DropdownMenu.Root onOpenChange={(open) => clickToShowNotification(open)}>
      <DropdownMenu.Trigger>
        <Button
          variant="soft"
          className="bg-primary-500 inline-flex gap-3 py-8 px-8 rounded-18 cursor-pointer hover:bg-primary-100"
        >
          <BellIcon className="w-24 h-24 text-white" />
          {showNotification && (
            <span className="text-white font-semibold">({unreadCount})</span>
          )}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content size="1">
        <DropdownMenu.Item onClick={onAddNotification}>
          <PlusIcon /> Add Notification
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onClick={NotiItemClick}
          />
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
