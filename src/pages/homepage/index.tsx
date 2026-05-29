import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AlphaFeed } from './sections/AlphaFeed';
import { IntelligenceStack } from './sections/IntelligenceStack';
import { CoreFeatures } from './sections/CoreFeatures';
import { Edge } from './sections/Edge';
import { BuiltForTraders } from './sections/BuiltForTraders';
import { IntelligenceNetwork } from './sections/IntelligenceNetwork';
import { Footer } from './sections/Footer';

export function HomePage() {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  return (
    <div className={`w-full overflow-hidden ${isShaking ? 'animate-[shake_0.4s_ease-in-out_infinite]' : ''}`}>
      <HeroSection triggerShake={triggerShake} />
      <AlphaFeed />
      <IntelligenceStack />
      <CoreFeatures />
      <Edge />
      <BuiltForTraders />
      <IntelligenceNetwork />
      <Footer />
    </div>
  );
}
