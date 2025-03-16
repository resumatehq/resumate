import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    title: "How does the AI assistant work?",
    content: "Our AI assistant guides you through entering your personal information, experience, and skills, and suggests improvements to optimize your resume.",
  },
  {
    title: "Can I customize the templates?",
    content: "Yes, you can easily customize sections to highlight your skills and experiences, and choose from a variety of professional templates.",
  },
  {
    title: "What formats can I export my resume in?",
    content: "You can export your resume in PDF, DOCX, or PNG formats to suit any application requirement.",
  },
  {
    title: "Is my data secure?",
    content: "Yes, your data is secure with our top-notch privacy measures.",
  },
];

export default function FaqsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">Frequently Asked Questions</h2>
          <p>Find answers to some of the most common questions about our platform.</p>
        </div>

        <Accordion type="single" collapsible className="my-4 w-full">
          {items.map(({ title, content }, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}