import { Rocket, Send, Mail } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          linkTo="/editor"
          icon={<Rocket />}
          title="Getting Started"
          description="Start your SalesBlink journey & get booked 🚀"
        />
        <FeatureCard
          linkTo="/editor"
          icon={<Send />}
          title="Sequences"
          description="Learn to launch & manage cold email sequences 📸"
        />
        <FeatureCard
          linkTo="/editor"
          icon={<Mail />}
          title="Email Senders"
          description="Learn to add & manage email addresses for sending emails 📸"
        />
        <FeatureCard
          linkTo="/editor"
          icon={<Rocket />}
          title="Getting Started"
          description="Start your SalesBlink journey & get booked 🚀"
        />
        <FeatureCard
          linkTo="/editor"
          icon={<Send />}
          title="Sequences"
          description="Learn to launch & manage cold email sequences 📸"
        />
        <FeatureCard
          linkTo="/editor"
          icon={<Mail />}
          title="Email Senders"
          description="Learn to add & manage email addresses for sending emails 📸"
        />
      </div>
    </div>
  );
};

export default HomePage;