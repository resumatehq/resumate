import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'John Smith',
        role: 'Marketing Manager',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        quote: 'ResumeAI helped me land my dream job! The AI-powered suggestions made my resume stand out, and the ATS optimization feature ensured my application made it past automated screening systems.',
    },
    {
        name: 'Anonymous user',
        role: 'Recent Graduate',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        quote: 'As a recent graduate with limited experience, I was struggling to create a professional resume. ResumeAI guided me through the entire process, suggesting the right keywords and helping me highlight my relevant skills. The templates are professional and the AI assistant was incredibly helpful!',
    },
    {
        name: 'Shekinah Tshiokufila',
        role: 'Senior Software Engineer',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        quote: 'ResumeAI is redefining how technical professionals present themselves. The tech-specific keyword suggestions and ATS optimization helped me showcase my skills effectively. I received more interview callbacks in one week than I did in months of job hunting with my old resume.',
    },
    {
        name: 'Oketa Fred',
        role: 'Career Switcher',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'Changing careers was intimidating, but ResumeAI made it manageable. The AI assistant helped me translate my existing skills into a new industry context, and the templates gave my resume a fresh, professional look.',
    },
    {
        name: 'Emma Chen',
        role: 'UX Designer',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        quote: "Using ResumeAI has been like having a personal career coach. The templates are beautifully designed, and the AI suggestions helped me craft compelling descriptions of my design projects. I'm impressed by how intuitive the entire platform is.",
    },
    {
        name: 'Joseph Kitheka',
        role: 'Fullstack Developer',
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        quote: 'ResumeAI has transformed my job application process. The ATS scanner identified keywords I was missing, and the AI assistant helped me refine my technical skills section. The export options made it easy to have versions ready for different application methods. This tool is essential for modern job hunting!',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section>
            <div className="py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-title text-3xl font-semibold">Loved by the Community</h2>
                        <p className="text-body mt-6">Harum quae dolore orrupti aut temporibus ariatur.</p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div key={chunkIndex} className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index}>
                                        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                                            <Avatar className="size-9">
                                                <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                                                <AvatarFallback>ST</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-medium">{name}</h3>

                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
