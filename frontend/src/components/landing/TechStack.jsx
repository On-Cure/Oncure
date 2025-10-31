import { Code2, Database, Server, Hexagon } from "lucide-react";

const technologies = [
  {
    icon: Code2,
    name: "Next.js",
    description: "React framework",
  },
  {
    icon: Server,
    name: "Go",
    description: "Backend services",
  },
  {
    icon: Database,
    name: "PostgreSQL",
    description: "Reliable database",
  },
  {
    icon: Hexagon,
    name: "Hedera",
    description: "Blockchain rewards",
  },
];

export default function TechStack() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built with Modern Tech
          </h2>
          <p className="text-lg text-muted-foreground">
            Powered by scalable, secure, and transparent technologies.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="bg-card p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <tech.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}