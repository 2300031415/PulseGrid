import Sidebar from "@/components/doctor/Sidebar";

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row bg-[#F8FCFC] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 lg:overflow-y-auto lg:max-h-screen">
        {children}
      </main>
    </div>
  );
}