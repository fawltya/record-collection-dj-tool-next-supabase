import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full p-2 gap-2">
      <div className="w-full flex md:w-64 md:p-6">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 w-full md:pb-20">
        {children}
      </div>
    </div>
  );
}
