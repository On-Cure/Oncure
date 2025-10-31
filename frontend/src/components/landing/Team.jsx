import { Github, Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Philip Ochieng",
    role: "Fullstack Developer & Team Lead",
    bio: "Leading the technical vision with passion for healthcare innovation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Philip",
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    bio: "Creating compassionate experiences for healing communities",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Dr. Michael Chen",
    role: "Healthcare Advisor",
    bio: "Ensuring clinical accuracy and patient-centered design",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    name: "Aisha Patel",
    role: "Blockchain Engineer",
    bio: "Building transparent reward systems on Hedera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Meet the Team Behind onCare
          </h2>
          <p className="text-lg text-muted-foreground">
            Passionate innovators committed to empowering healing through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="Email contact"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}