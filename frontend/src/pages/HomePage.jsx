import { Rocket, Send, Mail } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          linkTo="/editor"
          icon={<Rocket />}
          title="Start"
          description=" Design and implement an email marketing sequence using a visual flowchart interface. 🚀"
        />
        <FeatureCard
          linkTo="/templates"
          icon={<Send />}
          title="Email templates"
          description=" Manage email templates 📸"
        />
        <FeatureCard
          linkTo="/contacts"
          icon={<Mail />}
          title="Manage Leads"
          description="Add & manage your leads contacts  📸"
        />
        <FeatureCard
          linkTo="/"
          icon
          title=""
          description=""
        />
        <FeatureCard
          linkTo="/campaigns"
          icon={<Rocket />}
          title="Your Campaigns"
          description="Your campaign history 🕰️"
        />
        <FeatureCard
          linkTo="/"
          icon
          title=""
          description=""
        />
      </div>
    </div>
  );
};

export default HomePage;