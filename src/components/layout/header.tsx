import { AvatarIcon, BellIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import NotificationDropdownMenu from "./NotificationDropdownMenu";
import { useNotification } from "@/context/NotificationContext";

export default function Header() {
  const { mobileMenuOpen, setMobileMenuOpen } = useNotification();
  return (
    <header className="p-24 flex flex-row justify-between items-center">
      <div className="inline-flex gap-12 px-24">
        <HamburgerMenuIcon
          className="w-24 h-24 text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <span className="text-white font-semibold text-24 uppercase hidden md:inline">
          Notifications App
        </span>
      </div>
      <div className="flex gap-12">
        <NotificationDropdownMenu notiCount={10} />
        <div className="bg-dark-500 inline-flex gap-12 py-8 px-24 rounded-18">
          <AvatarIcon className="w-24 h-24 text-white" />
          <span className="text-white font-semibold hidden md:inline">
            Minh Song
          </span>
        </div>
      </div>
    </header>
  );
}
