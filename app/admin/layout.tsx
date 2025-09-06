// app\admin\layout.tsx
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layouts/app-sidebar";
import Header from "@/components/layouts/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Ishimwe Jean Baptiste Admin",
    template: "%s | Ishimwe Jean Baptiste Admin",
  },
  description: "Admin portal for Ishimwe Jean Baptiste",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    (await cookieStore).get("sidebar:state")?.value === "true";

  return (
    <KBar>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NuqsAdapter>
          <SidebarProvider defaultOpen={defaultOpen}>
            <ReactQueryProvider>
              <AppSidebar />
              <SidebarInset>
                <Header />
                {children}
              </SidebarInset>
            </ReactQueryProvider>
          </SidebarProvider>
        </NuqsAdapter>
      </ThemeProvider>
    </KBar>
  );
}
