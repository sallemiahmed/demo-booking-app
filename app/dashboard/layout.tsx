import SessionProvider from "@/components/SessionProvider";
import DashboardLayout from "@/components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SessionProvider>
  );
}
