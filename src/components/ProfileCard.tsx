import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react';

export function ProfileCard() {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'CSS', 
    'Tailwind CSS', 'Next.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git'
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/yourusername' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/yourusername' },
    { icon: Mail, label: 'Email', href: 'mailto:your.email@example.com' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardContent className="relative pt-0 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-12">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">Alex Johnson</h1>
                <p className="text-xl text-muted-foreground">Full Stack Developer & Technical Writer</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  San Francisco, CA
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  5+ years experience
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <Button key={link.label} variant="outline" size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              I'm a passionate full-stack developer with over 5 years of experience building 
              scalable web applications and writing technical content. I love exploring new 
              technologies and sharing my knowledge through blog posts and open-source contributions.
            </p>
            <p>
              When I'm not coding, you can find me hiking in the mountains, reading about the 
              latest tech trends, or experimenting with new recipes in the kitchen. I believe 
              in continuous learning and the power of community-driven development.
            </p>
            <p>
              I specialize in modern JavaScript frameworks, cloud technologies, and developer 
              experience optimization. My goal is to create efficient, maintainable solutions 
              while helping other developers grow in their careers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-primary pl-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Senior Full Stack Developer</h3>
                <span className="text-sm text-muted-foreground">2022 - Present</span>
              </div>
              <p className="text-muted-foreground mb-2">TechCorp Inc.</p>
              <p className="text-sm">
                Lead development of scalable web applications using React, Node.js, and cloud technologies. 
                Mentor junior developers and contribute to architectural decisions.
              </p>
            </div>
            
            <div className="border-l-2 border-muted pl-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                <span className="text-sm text-muted-foreground">2020 - 2022</span>
              </div>
              <p className="text-muted-foreground mb-2">StartupXYZ</p>
              <p className="text-sm">
                Built and maintained multiple client projects using modern web technologies. 
                Implemented CI/CD pipelines and improved development workflows.
              </p>
            </div>
            
            <div className="border-l-2 border-muted pl-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Frontend Developer</h3>
                <span className="text-sm text-muted-foreground">2019 - 2020</span>
              </div>
              <p className="text-muted-foreground mb-2">WebAgency Pro</p>
              <p className="text-sm">
                Developed responsive web applications and collaborated with design teams 
                to create pixel-perfect user interfaces.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}