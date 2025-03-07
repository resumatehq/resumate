import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Sparkles, Download, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ResumeAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/templates" className="font-medium">
              Templates
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
            <Link href="/about" className="font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Create Professional Resumes with AI Assistance
                </h1>
                <p className="text-lg mb-8 text-muted-foreground">
                  Our AI-powered platform helps you build ATS-friendly resumes that stand out to employers, without
                  requiring design skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2">
                    <Link href={"/builder"} >Create Your Resume <ArrowRight className="h-4 w-4" /></Link >
                  </Button>
                  <Button size="lg" variant="outline">
                    View Templates
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-muted rounded-lg p-6 shadow-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=500"
                    alt="Resume preview"
                    className="rounded border shadow-sm"
                    width={500}
                    height={600}
                  />
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform combines AI technology with professional design to help you create the perfect resume.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                  title: "AI Content Optimization",
                  description:
                    "Our AI assistant helps you craft professional descriptions and optimize content based on job requirements.",
                },
                {
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  title: "Professional Templates",
                  description: "Choose from a variety of professional templates designed to impress employers.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "ATS-Friendly",
                  description:
                    "Ensure your resume passes through Applicant Tracking Systems with our keyword optimization.",
                },
                {
                  icon: <Download className="h-10 w-10 text-primary" />,
                  title: "Multiple Export Formats",
                  description: "Export your resume in PDF, DOCX, or PNG formats to suit any application requirement.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Creating a professional resume has never been easier with our simple 4-step process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter Your Information",
                  description:
                    "Our AI assistant will guide you through entering your personal information, experience, and skills.",
                },
                {
                  step: "2",
                  title: "Choose a Template",
                  description:
                    "Select from our collection of professional templates that suit your industry and style.",
                },
                {
                  step: "3",
                  title: "Optimize Content",
                  description: "Our AI will suggest improvements and optimize your content for ATS systems.",
                },
                {
                  step: "4",
                  title: "Export & Share",
                  description: "Download your resume in multiple formats or share it directly with employers.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {index < 3 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(100%-24px)] w-[calc(100%-48px)] h-[2px] bg-primary/30">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-primary/30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Professional Resume?</h2>
            <p className="text-lg mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed interviews with our AI-powered resume builder.
            </p>
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">ResumeAI</span>
              </div>
              <p className="text-muted-foreground">AI-powered resume builder to help you land your dream job.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-muted-foreground hover:text-foreground">
                    Resume Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

