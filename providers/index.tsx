import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './theme-provider';
import { ResumeProvider } from '@/context/resume-context';
import { AuthProvider } from '@/context/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <SidebarProvider>
          <ResumeProvider>{children}</ResumeProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
