import { Cpu, FileText, Fingerprint, Pencil, Settings2, Shield, Sparkles, Zap } from 'lucide-react'

const features = [
    {
        icon: Sparkles,
        title: "AI Content Optimization",
        description: "Our AI assistant helps you craft professional descriptions and optimize content based on job requirements."
    },
    {
        icon: FileText,
        title: "Professional Templates",
        description: "Choose from a variety of professional templates designed to impress employers."
    },
    {
        icon: Fingerprint,
        title: "ATS-Friendly",
        description: "Ensure your resume passes through Applicant Tracking Systems with our keyword optimization."
    },
    {
        icon: Pencil,
        title: "Multiple Export Formats",
        description: "Export your resume in PDF, DOCX, or PNG formats to suit any application requirement."
    },
    {
        icon: Settings2,
        title: "Customizable Sections",
        description: "Easily customize sections to highlight your skills and experiences."
    },
    {
        icon: Shield,
        title: "Data Privacy",
        description: "Your data is secure with our top-notch privacy measures."
    },
]

export default function Features() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Key Features</h2>
                    <p>Our platform combines AI technology with professional design to help you create the perfect resume.</p>
                </div>

                <div className="relative mx-auto grid max-w-5xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <feature.icon className="size-4" />
                                <h3 className="text-sm font-medium">{feature.title}</h3>
                            </div>
                            <p className="text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
