import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { Download, Brain, Users, Lightbulb, Clock, MessageSquare } from "lucide-react";
import { SiGo, SiLaravel, SiReact, SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiMysql, SiBootstrap, SiGit } from "react-icons/si";

const skills = [
  { icon: SiHtml5, name: "HTML5" },
  { icon: SiCss3, name: "CSS3" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiGo, name: "Go" },
  { icon: SiLaravel, name: "Laravel" },
  { icon: SiBootstrap, name: "Bootstrap" },
  { icon: SiMysql, name: "SQL / MySQL" },
  { icon: SiReact, name: "React" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiGit, name: "Git" },
];

const softSkills = [
  { icon: Brain, name: "Problem Solving" },
  { icon: Users, name: "Team Collaboration" },
  { icon: Lightbulb, name: "Creative Thinking" },
  { icon: Clock, name: "Time Management" },
  { icon: MessageSquare, name: "Communication" },
];

export const About = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 px-4 bg-muted/30"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Two-column layout: Photo + About text */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Profile Image */}
          <div className="animate-fade-in">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary shadow-2xl relative">
                <img
                  src="/img/personal.jpeg"
                  alt="Fajar Arief Budiman"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>
          </div>

          {/* About text */}
          <div className="animate-slide-up space-y-6 text-justify">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h2>

            <h3 className="text-lg font-semibold text-primary uppercase tracking-wide">SOFTWARE DEVELOPER</h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello, my name is <span className="text-foreground font-semibold">Fajar Arief Budiman</span>. I'm a software developer who enjoys creating websites, applications, and systems that are both reliable and easy to use.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">I focus on writing clean and maintainable code, designing systems that perform well, and delivering solutions that meet real needs without unnecessary complexity.</p>
            <p className="text-lg text-muted-foreground leading-relaxed">My goal is to craft digital products that combine good design, practicality, and seamless user experiences.</p>

            {/* Contact Button */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Download className="h-5 w-5" />
              Let’s Work Together
            </Button>
          </div>
        </div>

        {/* Skills Section below the two-column layout */}
        <div className="mt-16 space-y-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border border-border hover:border-primary transition-all hover:scale-105"
                >
                  <skill.icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Soft Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border border-border hover:border-primary transition-all hover:scale-105"
                >
                  <skill.icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
