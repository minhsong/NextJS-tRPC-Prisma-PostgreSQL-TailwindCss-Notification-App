import { useNotification } from "@/context/NotificationContext";
import AddForm from "../AddForm";
import Header from "./header";
import Sidebar from "./sidebar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}
export default function AppLayout(props: Props) {
  const { showAddForm, setShowAddForm } = useNotification();
  const onCloseCallback = () => {
    setShowAddForm(false);
  };
  return (
    <div
      style={montserrat.style}
      className="h-screen overflow-hidden bg-primary-800 flex text-white"
    >
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="overflow-auto px-24">{props.children}</main>
        {showAddForm && <AddForm onCloseCallback={onCloseCallback} />}
      </div>
    </div>
  );
}
