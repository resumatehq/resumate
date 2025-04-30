'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './theme-provider';
import { ResumeProvider } from '@/context/resume-context';
import { UserProvider } from '@/context/profileContext';
import AppProvider from '@/components/app-provider';

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
          <SidebarProvider>
            <ResumeProvider>{children}</ResumeProvider>
          </SidebarProvider>
        </UserProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
