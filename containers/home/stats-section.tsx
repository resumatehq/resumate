import { NumberTicker } from "@/components/ui/number-ticker";

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Resumate in Numbers
          </h2>
          <p>
            Resumate is revolutionizing the way job seekers create and optimize
            their resumes. Here are some of our key achievements:
          </p>
        </div>

        <div className="grid gap-12 divide-y text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="inline-flex gap-2">
                <NumberTicker value={1500} className="text-5xl font-bold">
                </NumberTicker>
                <div className="text-5xl font-bold">+</div>
            </div >
            <p>Resumes Created</p>
          </div>
          <div className="space-y-4">
          <div className="inline-flex gap-2">
                <NumberTicker value={10000} className="text-5xl font-bold">
                </NumberTicker>
                <div className="text-5xl font-bold">+</div>
            </div >
            <p>Happy Users</p>
          </div>
          <div className="space-y-4">
          <div className="inline-flex gap-2">
                <NumberTicker value={98} className="text-5xl font-bold">
                </NumberTicker>
                <div className="text-5xl font-bold">%</div>
            </div >
            <p>Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
