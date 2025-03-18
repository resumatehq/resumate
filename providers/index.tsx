import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { ResumeProvider } from "@/context/resume-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <ResumeProvider>{children}</ResumeProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
