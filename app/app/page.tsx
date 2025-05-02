// import React from 'react';

// export default function AppPage() {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//         <div className="aspect-video rounded-xl bg-muted/50" />
//         <div className="aspect-video rounded-xl bg-muted/50" />
//         <div className="aspect-video rounded-xl bg-muted/50" />
//       </div>
//       <div className="min-h-[100vh] aspect-video flex-1 rounded-xl bg-muted/50 md:min-h-min" />
//     </div>
//   );
// }
'use client';
import DocumentsTabs from './documents/tabs';
import { BadgeCheck, BookOpen, LineChart, School, Crown } from 'lucide-react';

export default function AppPage() {
  const services = [
    {
      title: 'Explore Career Insights',
      url: 'https://resume.io/assets/media/getAssessmentf60aad915d73085bb749.png',
      description:
        'Take the assessment and see the step-by-step path to your ideal role.',
      icon: <LineChart className="w-6 h-6 text-purple-500" />,
      bgColor: 'bg-violet-50',
    },
    {
      title: 'First 90 Days Plan',
      url: 'https://resume.io/assets/media/Planfa49383f1aa629b9a411.svg',
      description:
        'Your expert guide to achieving success in your first 90 days of a new job.',
      icon: <BadgeCheck className="w-6 h-6 text-green-600" />,
      tag: 'New',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Discover Your Next Steps',
      url: 'https://resume.io/assets/media/ExploreCareers44be93a7505576460f6b.svg',
      description:
        'Discover ideal career paths and find your next best steps towards success.',
      icon: <BookOpen className="w-6 h-6 text-gray-600" />,
      bgColor: 'bg-gray-100',
    },
    {
      title: 'Build Your Skills',
      url: 'https://resume.io/assets/media/BuildSkills33cd0fc8ddec7b5e2b7c.svg',
      description:
        'Beat the competition with a bootcamp. We match you with 600+ training schools.',
      icon: <School className="w-6 h-6 text-green-800" />,
      tag: 'New',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-600">Hi, User!</h2>
          <h1 className="text-2xl font-medium text-gray-900">
            It's time to excel at your job
          </h1>
        </div>
        <button className="flex text-lg bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-indigo-800">
          <Crown className="w-6 h-6 mr-2" />
          Upgrade Now
        </button>
      </div>

      {/* Title */}
      <h3 className="text-3xl font-semibold mb-4">
        Career development services
      </h3>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-4 shadow-md ${service.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >
            {/* New badge */}
            {service.tag && (
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {service.tag}
              </span>
            )}

            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm mb-4">
              {service.icon}
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={service.url}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Title & Description */}
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              {service.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-3xl font-semibold mb-4 mt-8">Recommended Jobs</h3>
      <div className="relative rounded-2xl bg-white shadow-md overflow-hidden max-w-full h-[40vh]">
        {/* Nền mờ */}
        <div className="absolute bg-[url(https://resume.io/assets/media/no_role41da08f75eac4d6cfd11.png)] inset-0 bg-cover bg-center filter blur-sm scale-110"></div>

        {/* Overlay tối mờ nếu cần thêm chiều sâu */}
        <div className="absolute inset-0 bg-white/60"></div>

        {/* Nội dung chính */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <img
            src="https://resume.io/assets/media/no_role41da08f75eac4d6cfd11.png"
            alt=""
            className="w-24 h-24 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Which role are you going for?
          </h3>
          <p className="text-sm text-gray-600 mb-4 max-w-sm">
            If you tell us where you're headed, we can show you how to get
            there.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-lg shadow-md transition">
            Continue
          </button>
        </div>
      </div>

      <h3 className="text-3xl font-semibold mb-4 mt-8">Documents</h3>
      <DocumentsTabs />
    </div>
  );
}
