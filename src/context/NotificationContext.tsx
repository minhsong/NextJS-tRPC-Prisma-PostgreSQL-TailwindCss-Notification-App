import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { NotificationType } from "../../types";
import { trpc } from "../../src/utils/trpc";

interface NotificationContextType {
  notifications: NotificationType[];
  showAddForm: boolean;
  unreadCount: number;
  addNotification: (notification: NotificationType) => void;
  markAsRead: (id: number) => void;
  setShowAddForm: (show: boolean) => void;
  refetch: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const addNotification = (notification: NotificationType) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const { data: notiData, refetch } = trpc.notifications.getAll.useQuery();

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  useEffect(() => {
    setNotifications(notiData || []);
  }, [notiData]);

  useEffect(() => {
    if (!showAddForm) {
      refetch();
    }
  }, [showAddForm, refetch]);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showAddForm,
        unreadCount,
        addNotification,
        markAsRead,
        setShowAddForm,
        refetch,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
