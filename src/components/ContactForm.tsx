import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, User, Send, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you would send the data to your backend
    // For now, we'll just open the default email client
    const subject = encodeURIComponent('Contact from Blog');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;

    toast({
      title: "Message sent!",
      description: "Your default email client should open with the message pre-filled.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      href: 'https://github.com/yourusername',
      description: 'Check out my code and projects'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/yourusername',
      description: 'Connect with me professionally'
    },
    { 
      icon: Twitter, 
      label: 'Twitter', 
      href: 'https://twitter.com/yourusername',
      description: 'Follow me for tech updates'
    },
    { 
      icon: Mail, 
      label: 'Email', 
      href: 'mailto:your.email@example.com',
      description: 'Send me a direct email'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question, want to collaborate, or just want to say hi? 
          I'd love to hear from you! Feel free to reach out through any of the methods below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, question, or just say hello..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Links */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Connect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 rounded-lg border hover:bg-muted transition-colors"
                >
                  <link.icon className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">{link.label}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Response Time</h4>
                <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
              </div>
              <div>
                <h4 className="font-medium">Best For</h4>
                <p className="text-sm text-muted-foreground">
                  Project collaborations, technical questions, speaking opportunities
                </p>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-muted-foreground">San Francisco, CA (PST)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}