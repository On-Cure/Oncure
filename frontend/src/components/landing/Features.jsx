import { UserCircle, MessageSquare, EyeOff, GraduationCap, Coins, Bell } from "lucide-react";

const features = [
  {
    icon: UserCircle,
    title: "User Profiles",
    description: "Create your story, share your journey, and connect authentically with verified profiles and badges.",
  },
  {
    icon: MessageSquare,
    title: "Community Feed",
    description: "Share updates, ask questions, and celebrate milestones in a supportive, moderated space.",
  },
  {
    icon: EyeOff,
    title: "Anonymous Mode",
    description: "Share without stigma. Post and connect anonymously whenever you need privacy and safety.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Coaching",
    description: "Connect with survivors, caregivers, and certified health coaches for guidance and hope.",
  },
  {
    icon: Coins,
    title: "Blockchain Rewards",
    description: "Earn transparent, Hedera-powered tokens for engagement, milestones, and helping others heal.",
  },
  {
    icon: Bell,
    title: "Notifications & Events",
    description: "Stay connected with real-time updates, community events, and support group sessions.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Features Built for Healing
          </h2>
          <p className="text-lg text-muted-foreground">
            Every feature is designed with empathy, privacy, and empowerment in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-7 h-7 text-accent-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}