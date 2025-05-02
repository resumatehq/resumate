// 'use client';

// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function DocumentsTabs() {
//   const pathname = usePathname();
//   const tabs = ['resumes', 'cover-letters'];

//   const activeTab = tabs.find((tab) => pathname.includes(tab)) || 'resumes';

//   return (
//     <div className="container mx-auto py-2 max-w-full">
//       <div className="border-b border-gray-200">
//         <nav className="relative flex border-b border-gray-200 mb-2">
//           {tabs.map((tab) => (
//             <Link
//               key={tab}
//               href={`/app/documents/${tab}`}
//               className={`pb-2 text-xl font-medium mr-4 relative ${
//                 activeTab === tab
//                   ? 'text-gray-700'
//                   : 'text-gray-400 hover:text-gray-700'
//               }`}
//             >
//               {tab === 'resumes' ? 'Resumes' : 'Cover Letters'}

//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="underline"
//                   className="absolute left-0 bottom-0 h-1 w-full bg-gray-700 rounded-full"
//                   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-center">
//         <div className="bg-amber-100 rounded-full p-3 mr-4">
//           <span className="text-amber-500 text-xl">📨</span>
//         </div>
//         <div>
//           <p className="font-medium">
//             Ready to give your job search a boost and get more exposure?
//           </p>
//           <p className="text-gray-600 text-sm">
//             Choose your resume and we'll send it to hundreds of recruiters in
//             your field in just a few clicks
//           </p>
//         </div>
//         <Button variant="outline" className="ml-auto whitespace-nowrap">
//           Start Now
//         </Button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CoverLetters from './cover-letters/cover-letters';
import Resumes from './resumes/resumes';

export default function DocumentsTabs() {
  const [activeTabDB, setActiveTabDB] = useState<'resumes' | 'cover-letters'>(
    'resumes'
  );
  const pathname = usePathname();
  const tabs = ['resumes', 'cover-letters'];

  const isDocumentsRoute = pathname.includes('/documents');
  const activeTabFromURL =
    tabs.find((tab) => pathname.includes(tab)) || 'resumes';
  const currentActiveTab = isDocumentsRoute ? activeTabFromURL : activeTabDB;

  const renderTabContent = () => {
    if (currentActiveTab === 'resumes') return <Resumes />;
    return <CoverLetters />;
  };

  return (
    <div className="container mx-auto py-2 max-w-full">
      <div className="border-b border-gray-200">
        <nav className="relative flex border-b border-gray-200 mb-2">
          {tabs.map((tab) => {
            const label = tab === 'resumes' ? 'Resumes' : 'Cover Letters';

            if (isDocumentsRoute) {
              return (
                <Link
                  key={tab}
                  href={`/app/documents/${tab}`}
                  className={`pb-2 text-xl font-medium mr-4 relative ${
                    currentActiveTab === tab
                      ? 'text-gray-700'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {label}
                  {currentActiveTab === tab && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 bottom-0 h-1 w-full bg-gray-700 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            }

            return (
              <div
                key={tab}
                onClick={() =>
                  setActiveTabDB(tab as 'resumes' | 'cover-letters')
                }
                className={`pb-2 text-xl font-medium mr-4 relative cursor-pointer ${
                  currentActiveTab === tab
                    ? 'text-gray-700'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {label}
                {currentActiveTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-1 w-full bg-gray-700 rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-center">
        <div className="bg-amber-100 rounded-full p-3 mr-4">
          <span className="text-amber-500 text-xl">📨</span>
        </div>
        <div>
          <p className="font-medium">
            Ready to give your job search a boost and get more exposure?
          </p>
          <p className="text-gray-600 text-sm">
            Choose your resume and we'll send it to hundreds of recruiters in
            your field in just a few clicks
          </p>
        </div>
        <Button variant="outline" className="ml-auto whitespace-nowrap">
          Start Now
        </Button>
      </div>

      {/* ✅Render nội dung tab kể cả ngoài route documents */}
      {renderTabContent()}
    </div>
  );
}
