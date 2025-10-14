import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useLanguage } from '../context/LanguageContext';
import { toast } from '../hooks/use-toast';
import { Github, Linkedin, Instagram, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { icon: Linkedin, url: 'https://linkedin.com/in/fajrarf', label: 'LinkedIn' },
  { icon: Github, url: 'https://github.com/fajarariefbudiman', label: 'GitHub' },
  { icon: Instagram, url: 'https://www.instagram.com/fajararief_', label: 'Instagram' },
  { icon: MessageCircle, url: 'https://wa.me/+6283873630760', label: 'WhatsApp' },
];

export const Contact = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t('contact.success'),
        description: t('contact.success'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder={t('contact.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder={t('contact.subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background border-border resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t('contact.send')}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="animate-slide-up space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary transition-all hover:scale-105 group"
                  >
                    <social.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-foreground">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-background border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Location
              </h3>
              <p className="text-muted-foreground">
                Tangerang, Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
