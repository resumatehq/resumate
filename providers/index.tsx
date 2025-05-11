"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "@/context/profileContext";
import AppProvider from "@/components/app-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider>
        <UserProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </UserProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
