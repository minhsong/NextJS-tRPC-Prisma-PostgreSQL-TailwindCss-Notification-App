import { BellIcon } from "@radix-ui/react-icons";
import NotificationDropdownMenu from "./NotificationDropdownMenu";

export default function Header() {
  return (
    <header className="p-24 flex flex-row justify-between items-center">
      <div className="inline-flex gap-12 px-24">
        <span className="text-white font-semibold text-24 uppercase">
          Notifications App
        </span>
      </div>
      <div className="flex gap-12">
        <NotificationDropdownMenu notiCount={10} />
        <div className="bg-dark-500 inline-flex gap-12 py-8 px-24 rounded-18">
          <span className="text-white font-semibold">Minh Song</span>
        </div>
      </div>
    </header>
  );
}
