import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) || [];

function isAdminUser(userEmail: string): boolean {
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Check if user is admin
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail || !isAdminUser(userEmail)) {
    console.warn(`Unauthorized access attempt by: ${userEmail}`);
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-midnight-900 pt-16">
      <div className="flex flex-col lg:flex-row">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
