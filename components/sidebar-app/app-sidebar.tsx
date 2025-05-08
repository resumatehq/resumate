'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  BriefcaseBusiness,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Search,
  SquareTerminal,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import { UserContext } from '@/context/profileContext';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Personal',
      logo: Command,
      plan: 'Free',
    },
    {
      name: 'Design Team',
      logo: GalleryVerticalEnd,
      plan: 'Pro',
    },
    {
      name: 'Marketing',
      logo: AudioWaveform,
      plan: 'Business',
    },
  ],
  dashboard: [
    {
      title: 'Dashboard',
      url: '/app',
      icon: SquareTerminal,
    },
  ],
  navMain1: [
    {
      title: 'Jobs',
      url: '/app/jobs',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Job Tracker',
      url: ' /app/job-tracker',
      icon: PieChart,
    },
  ],
  documents: [
    {
      title: 'Documents',
      url: '/app/documents',
      icon: FileText,
      items: [
        {
          title: 'My Resumes',
          url: '/app/documents/resumes',
        },
        {
          title: 'My Cover Letters',
          url: '/app/documents/cover-letters',
        },
      ],
    },
  ],
  jobsearchmethods: [
    {
      title: 'Job Search Methods',
      url: '/app/job-search-methods',
      icon: Search,
      items: [
        {
          title: 'The Master Plan',
          url: '/app/job-search-methods/master-plan',
        },
        {
          title: 'Brand Yourself',
          url: '/app/job-search-methods/brand-yourself',
        },
        {
          title: 'Get More Interviews',
          url: '/app/job-search-methods/get-more-interviews',
        },
        {
          title: 'Interview And Win',
          url: '/app/job-search-methods/interview-and-win',
        },
        {
          title: 'Close The Deal',
          url: '/app/job-search-methods/close-the-deal',
        },
      ],
    },
  ],
  resources: [
    {
      title: 'Resources',
      url: '/resources',
      icon: BookOpen,
      items: [
        {
          title: 'Resume Tips',
          url: '/resources/tips',
        },
        {
          title: 'Interview Prep',
          url: '/resources/interview',
        },
        {
          title: 'Career Blog',
          url: '/resources/blog',
        },
        {
          title: 'FAQ',
          url: '/resources/faq',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(UserContext) || {};
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.dashboard} />
        <NavMain collapsibleItems={data.documents} />
        <NavMain items={data.navMain1} />
        <NavMain collapsibleItems={data.resources} />
        <NavMain collapsibleItems={data.jobsearchmethods} />
      </SidebarContent>
      <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
