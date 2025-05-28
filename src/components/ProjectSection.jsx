import { ExternalLink } from "lucide-react";


const projects = [
    {
        id: 1,
        title: "Y24 – Trap Camera Website",
        description: "Built a responsive website for showcasing wildlife trap cameras using HTML, CSS, JavaScript, and Bootstrap. It is a website for a wildlife conservation organization that showcases the work they do.",
        image: "img1.png",
        tags: ["React", "TailwindCSS", "Javascript", "bootstrap", "jquery"],
        demoUrl: "https://y24.co.in/",
    },
    {
        id: 2,
        title: "React Portfolio website",
        description: "A portfolio website built using React and TailwindCSS. It is a simple and clean portfolio website that showcases my projects and skills.",
        image: "img3.png",
        tags: ["React", "TailwindCSS", "Jquery", "Emailjs", "lucide-react"],
        demoUrl: "https://ayush-thite.vercel.app/",
    },
];

export const ProjectSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Featured <span className="text-primary">Projects</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Here are some of my recent projects. Each project was carefully
                    crafted with attention to detail, performance, and user experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <a 
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={`../../public/Projects/${project.image}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                            </a>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground mb-4">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex">
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};