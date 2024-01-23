import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full p-2 gap-2">
      <div className=" flex md:w-12 md:p-4">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 w-full md:pb-20">
        {children}
        <Toaster richColors={true} />
      </div>
    </div>
  );
}
