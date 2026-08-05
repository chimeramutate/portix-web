import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Architecture from '@/components/Architecture';
import Platforms from '@/components/Platforms';
import GettingStarted from '@/components/GettingStarted';
import Download from '@/components/Download';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Platforms />
        <Download />
        <GettingStarted />
      </main>
      <Footer />
    </div>
  );
}

export default App;
