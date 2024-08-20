import * as Collapsible from "@radix-ui/react-collapsible";
import {
  HomeIcon,
  OpenInNewWindowIcon,
  BoxIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const SIDEBAR_DATA = [
  {
    key: "/",
    icon: <HomeIcon className="w-20 h-20" />,
    title: "Home",
  },
  {
    key: "/chats",
    icon: <ChatBubbleIcon className="w-20 h-20" />,
    title: "Chats",
  },
  {
    key: "/comments",
    icon: <BoxIcon className="w-20 h-20" />,
    title: "Comments",
  },
  {
    key: "/workspace",
    icon: <OpenInNewWindowIcon className="w-20 h-20" />,
    title: "Workspace",
  },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState<string | null>("/dashboard");
  const [childActive, setChildActive] = React.useState<string>("/dashboard");
  const handleCollapse = (key: string, item: any) => {
    if (!item.child) {
      setChildActive(item.key);
    }
    if (open && key === open) {
      setOpen(null);
      return;
    }
    setOpen(key);
  };
  const handleClickChild = (key: string) => {
    setChildActive(key);
  };
  return (
    <>
      <div className="py-24 px-32 text-grey">
        <div>
          <div className="px-12 font-semibold mb-16">MAIN MENU</div>
          {SIDEBAR_DATA.map((item, index) => {
            let active = childActive;
            return (
              <Collapsible.Root
                key={index}
                className="CollapsibleRoot"
                open={open === item.key}
                onOpenChange={() => handleCollapse(item.key, item)}
              >
                <Collapsible.Trigger asChild>
                  <Link
                    href={item.key}
                    className={`
                     ${
                       active === item.key
                         ? "text-secondary-800 bg-secondary-100 font-semibold "
                         : ""
                     }
                     flex rounded-18 hover:bg-secondary-100 hover:text-secondary-800 p-12 align-middle justify-between mb-8 cursor-pointer`}
                  >
                    <div className="flex gap-16">
                      {item.icon} {item.title}
                    </div>
                  </Link>
                </Collapsible.Trigger>
              </Collapsible.Root>
            );
          })}
        </div>
      </div>
    </>
  );
}
