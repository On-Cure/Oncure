import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const team = [
  {
    name: "Doreen Atieno",
    role: "Product Manager",
    bio: "I am a Full Stack Software Developer and a blockchain enthusiast.",
    avatar: "/images/team/doreen.png",
    social: {
      github: "https://github.com/Doreen-Onyango",
      linkedin: "https://linkedin.com/in/doreen-atieno-466104239",
      twitter: "https://x.com/@DoreenAtieno17",
      email: "mailto:doreen@oncare.health"
    }
  },
  {
    name: "Fred Gitonga",
    role: "Backend Developer",
    bio: "Writing smart contract with Rust and Solidity, backend development with Go and JS, and emerging tech like blockchain.",
    avatar: "/images/team/fred.jpg",
    social: {
      github: "https://github.com/FredMunene",
      linkedin: "https://linkedin.com/in/fredgitonga",
      twitter: "https://x.com/@gitonga2050",
      email: "mailto:fred@oncare.health"
    }
  },
  {
    name: "Odinga Valery",
    role: "Quality Developer",
    bio: "software developer immersed in full-stack development and the world of web3 developments. Its a pleasure to connect with you!",
    avatar: "/images/team/vallery.jpg",
    social: {
      linkedin: "https://linkedin.com/in/odinga-valery",
      twitter: "https://twitter.com/@odingaval",
      email: "mailto:odingaval71@gmail.com"
    }
  },
  {
    name: "Philip Ochieng",
    role: "Frontend Developer",
    bio: "Full Stack Software Developer with a passion for building user-friendly and efficient web applications onchain.",
    avatar: "/images/team/philip.jpg",
    social: {
      github: "https://github.com/Philip38-hub",
      linkedin: "https://x.com/@oumaphilp01",
      email: "mailto:aisha@oncare.health"
    }
  },
  {
    name: "Dolphine Akinyi",
    role: "Social media Manager",
    bio: "",
    avatar: "/images/team/dolphine.jpeg",
    social: {
      github: "https://github.com/aisha",
      linkedin: "https://linkedin.com/in/aisha",
      email: "mailto:aisha@oncare.health"
    }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
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
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={member.social.email}
                      className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}