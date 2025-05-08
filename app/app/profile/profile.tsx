'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Calendar,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { UserContext } from '@/context/profileContext';

export default function ProfileView() {
  const { user } = React.useContext(UserContext) || {};

  // Sample skills and experience data (in a real app, this would come from the user data)
  const skills = [
    'JavaScript',
    'React',
    'TypeScript',
    'Node.js',
    'UI/UX Design',
    'Problem Solving',
    'Team Leadership',
  ];

  const workExperience = [
    {
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      duration: '2019 - Present',
    },
    {
      company: 'Digital Solutions LLC',
      position: 'Frontend Developer',
      duration: '2017 - 2019',
    },
    {
      company: 'Web Creators Co.',
      position: 'Junior Developer',
      duration: '2015 - 2017',
    },
  ];

  const education = [
    {
      institution: 'Stanford University',
      degree: 'Master of Computer Science',
      year: '2015-2017',
    },
    {
      institution: 'University of California',
      degree: 'Bachelor of Science in Computer Engineering',
      year: '2011-2015',
    },
  ];

  const formatDateOfBirth = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Link href="/app/profile/edit">
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1 bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="pt-6 px-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 bg-gray-400 text-white p-2 rounded-full">
                <AvatarImage
                  src={user?.avatar_url || ''}
                  alt={user?.username}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user?.username
                    ? user?.username.substring(0, 2).toUpperCase()
                    : 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="relative">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {user?.username || 'Username'}
                  <Badge
                    variant="outline"
                    className="absolute bottom-5 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-semibold rounded-lg px-2 py-1.5"
                  >
                    {user?.tier || 'Standard'}
                  </Badge>
                </h2>
              </div>
              <p className="text-base text-gray-500">
                {user?.industry || 'Industry'}
              </p>

              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-base">
                  {user?.location || 'Location'}
                </span>
              </div>

              <Separator className="my-4" />

              <div className="grid w-full gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-base truncate text-gray-700">
                    {user?.email || 'email@example.com'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-base text-gray-700">
                    {user?.phone || 'Phone number'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-base text-gray-700">
                    {user?.date_of_birth
                      ? formatDateOfBirth(user.date_of_birth)
                      : 'Date of birth'}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex gap-3 mt-2">
                {user?.social_links?.github && (
                  <a
                    href={`https://github.com/${user?.social_links.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
                {user?.social_links?.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${user?.social_links.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {user?.social_links?.twitter && (
                  <a
                    href={`https://twitter.com/${user?.social_links.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                {user?.social_links?.website && (
                  <a
                    href={`https://${user?.social_links.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full h-auto grid-cols-4 gap-2 mb-3">
              <TabsTrigger
                value="about"
                className=" uppercase text-lg font-semibold flex items-center justify-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className=" uppercase text-lg font-semibold flex items-center justify-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Experience</span>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className=" uppercase text-lg font-semibold flex items-center justify-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Education</span>
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className=" uppercase text-lg font-semibold flex items-center justify-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                <Star className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {user?.bio || 'No bio information available.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <h3 className="text-lg text-gray-500 font-semibold">
                        Industry
                      </h3>
                      <p className="text-gray-800">
                        {user?.industry || 'Not specified'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg text-gray-500 font-semibold">
                        Experience
                      </h3>
                      <p className="text-gray-800">
                        {user?.experience || 'Not specified'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg text-gray-500 font-semibold">
                        Status
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          user?.status === 'online'
                            ? 'bg-green-50 text-green-700 border-green-200 text-base font-medium'
                            : 'border-gray-300 text-gray-600 text-base font-medium'
                        }
                      >
                        {user?.status || 'Not specified'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base text-gray-500 font-semibold">
                        Member Since
                      </h3>
                      <p className="text-gray-800">
                        {new Date(
                          user?.created_at || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workExperience.map((job, index) => (
                      <div
                        key={index}
                        className="relative pl-6 pb-6 border-l border-gray-300 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 bg-white border-4 border-gray-300 rounded-full w-3 h-3 -translate-x-1/2"></div>
                        <h3 className="font-semibold text-gray-800">
                          {job.position}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600">{job.company}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                            {job.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="relative pl-6 pb-6 border-l border-gray-300 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 bg-white border-4 border-gray-300 rounded-full w-3 h-3 -translate-x-1/2"></div>
                        <h3 className="font-semibold text-gray-800">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600">
                            {edu.institution}
                          </span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                            {edu.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="py-1.5 text-gray-800 font-semibold text-base rounded-2xl "
                      >
                        <span className="px-3">{skill}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
