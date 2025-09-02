import { Header } from '@/components/Header';
import { ProfileCard } from '@/components/ProfileCard';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <ProfileCard />
      </div>
    </div>
  );
}