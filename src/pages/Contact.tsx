import { Header } from '@/components/Header';
import { ContactForm } from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <ContactForm />
      </div>
    </div>
  );
}