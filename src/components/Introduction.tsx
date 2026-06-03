import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Target } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
};

interface GlassCardProps {
  icon: React.ReactNode;
  number: string;
  title: string;
  body: string;
  delay?: number;
}

function GlassCard({ icon, number, title, body, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="glass rounded-2xl p-8 flex flex-col gap-4 group hover:border-cyan-500/30 transition-colors duration-500"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
          {icon}
        </div>
        <div>
          <span className="text-4xl font-bold text-cyan-400 glow-cyan-sm">{number}</span>
          <h3 className="text-lg font-bold text-white mt-1 uppercase tracking-wide">{title}</h3>
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
    </motion.div>
  );
}

export default function Introduction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="introduction" className="relative py-28 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-cyan-500/30" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Overview</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Introduction & <span className="gradient-text">Objective</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard
            icon={<Brain size={22} className="text-cyan-400" />}
            number="01"
            title="Introduction"
            body="Virtual reality (VR) environments deliver immersive experiences by stimulating visual, vestibular, and proprioceptive systems. However, a substantial number of users experience cybersickness when using VR. Cybersickness can result in nausea, headaches, and dizziness. Traditional diagnostic methods rely on subjective post-session questionnaires, such as the Simulator Sickness Questionnaire (SSQ). While useful for static evaluation, these methods cannot track the temporal onset of distress or enable adaptive mitigation during a VR session."
            delay={0}
          />
          <GlassCard
            icon={<Target size={22} className="text-indigo-400" />}
            number="02"
            title="Objective"
            body="The central objective of this research is to investigate the correlation between eye-tracking metrics and user discomfort in virtual environments. By analyzing specific oculomotor behaviors, the project seeks to identify the most predictive eye parameters through machine learning and deep learning techniques. Ultimately, the goal is to validate these models within Unity VR scenes to ensure they can accurately anticipate cybersickness before symptoms become severe."
            delay={1}
          />
        </div>

        {/* Abstract highlight bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 glass rounded-2xl p-6 border-l-2 border-cyan-400"
        >
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            <span className="text-cyan-400 font-semibold">Abstract:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

