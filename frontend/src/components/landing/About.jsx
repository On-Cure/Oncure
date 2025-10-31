import { Heart, Users, Award, Shield } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Community",
    description: "Connect with others who understand your journey",
  },
  {
    icon: Heart,
    title: "Mentorship",
    description: "Learn from survivors and certified health coaches",
  },
  {
    icon: Award,
    title: "Rewards",
    description: "Earn blockchain-backed incentives for engagement",
  },
  {
    icon: Shield,
    title: "Privacy",
    description: "Share safely with anonymous mode and secure tech",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground">
            onCare is more than a platform—it's a movement to transform cancer care 
            through connection, transparency, and technology. We believe healing 
            happens when people feel seen, supported, and empowered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}