import { PackageSearch, Settings, Eye } from "lucide-react";
import Features from "./features-section";
import { Steps } from "@/components/ui/step";

import { UserCircle, FileText, ClipboardList, Share } from 'lucide-react';

const data = [
  {
    id: 1,
    title: "1. Enter Your Information",
    content: "Our AI assistant will guide you through entering your personal information, experience, and skills.",
    image: "./steps/enter-your-information.png",
    icon: <UserCircle className="size-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Choose a Template",
    content: "Select from our collection of professional templates that suit your industry and style.",
    image: "./steps/choose-template.png",
    icon: <FileText className="size-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Optimize Content",
    content: "Our AI will suggest improvements and optimize your content for ATS systems.",
    image: "./steps/optimize-content.png",
    icon: <ClipboardList className="size-6 text-primary" />,
  },
  {
    id: 4,
    title: "4. Export & Share",
    content: "Download your resume in multiple formats or share it directly with employers.",
    image: "./steps/export-and-share.png",
    icon: <Share className="size-6 text-primary" />,
  },
];
export function StepsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Your Resume Journey
          </h2>
          <p>
            Create a professional resume in minutes with our simple four-step
            process
          </p>
        </div>
        <Steps data={data} />
      </div>
    </section>
  );
}
