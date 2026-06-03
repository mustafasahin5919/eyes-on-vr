import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Dataset from './components/Dataset';
import Pipeline from './components/Pipeline';
import Architecture from './components/Architecture';
import Results from './components/Results';

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-slate-500 text-xs text-center sm:text-left">
          <span className="text-cyan-400 font-bold">EYES ON VR</span> · AI-Driven Cybersickness Prediction from Eye Biometrics
        </div>
        <div className="text-slate-600 text-xs">
          Mustafa Şahin · Eren Gül · Supervisor: Assoc. Prof. Ufuk Çelikcan
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1021]">
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Dataset />
        <Pipeline />
        <Architecture />
        <Results />
      </main>
      <Footer />
    </div>
  );
}

