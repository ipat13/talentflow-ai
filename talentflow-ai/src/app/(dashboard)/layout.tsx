import { Sidebar, Header } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 dashboard-layout" style={{ overflow: 'visible' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-visible relative" style={{ overflow: 'visible', zIndex: 1 }}>
        <Header />
        <main id="main-content" className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 dashboard-content">{children}</main>
      </div>
    </div>
  );
}
