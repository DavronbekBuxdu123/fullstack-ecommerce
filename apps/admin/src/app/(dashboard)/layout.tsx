import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

import { cookies } from "next/headers";
import { AppSidebar } from "../components__/AppSidebar";
import Navbar from "../components__/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <div className="flex">
      {" "}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div className="w-full p-4">
            <Navbar />
            {children}
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
