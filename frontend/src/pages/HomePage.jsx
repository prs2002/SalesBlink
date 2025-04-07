import React from 'react';
import { Rocket, Send, Mail } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Rocket />}
          title="Getting Started"
          description="Start your SalesBlink journey & get booked 🚀"
        />
        <FeatureCard
          icon={<Send />}
          title="Sequences"
          description="Learn to launch & manage cold email sequences 📸"
        />
        <FeatureCard
          icon={<Mail />}
          title="Email Senders"
          description="Learn to add & manage email addresses for sending emails 📸"
        />
      </div>
    </div>
  );
};

export default HomePage;