import Sidebar from "@/components/doctor/Sidebar";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row bg-[#F8FCFC] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-4 md:p-8 lg:max-h-screen lg:overflow-y-auto">
        {children}
      </main>

    </div>
  );
}