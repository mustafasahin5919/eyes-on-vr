import { motion } from 'framer-motion';
import { Users, Database, Eye, Layers, Cpu, Activity } from 'lucide-react';

const stats = [
  { icon: Users, value: '30+', label: 'Participants', desc: 'Diverse subject pool across age groups', color: 'cyan' },
  { icon: Layers, value: '4', label: 'VR Environments', desc: 'Distinct "Coaster" scenario scenes', color: 'indigo' },
  { icon: Eye, value: '24', label: 'Eye Features', desc: 'Biometric input feature dimensions', color: 'cyan' },
  { icon: Database, value: '117K+', label: 'Data Samples', desc: 'Labeled time-series observations', color: 'indigo' },
  { icon: Cpu, value: '2', label: 'Model Types', desc: 'Classification & Regression models', color: 'cyan' },
  { icon: Activity, value: '2', label: 'Key Biometrics', desc: 'Pupil size & optical flow features', color: 'indigo' },
];

const colorMap = {
  cyan: {
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    hover: 'hover:border-cyan-500/40',
    glow: 'group-hover:shadow-cyan-500/10',
    value: 'text-cyan-400',
  },
  indigo: {
    icon: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    hover: 'hover:border-indigo-500/40',
    glow: 'group-hover:shadow-indigo-500/10',
    value: 'text-indigo-400',
  },
};

export default function Dataset() {
  return (
    <section id="dataset" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-indigo-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Data</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Dataset <span className="gradient-text">Overview</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            The study involved participants who engaged with four distinct virtual environments of "Coaster" scenarios. Data collection focused on key biometric features — pupil size, blink frequency, and optical flow features.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const c = colorMap[stat.color as keyof typeof colorMap];
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group glass rounded-2xl p-6 border ${c.border} ${c.hover} transition-all duration-300 ${c.glow} hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <Icon size={20} className={c.icon} />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-current transition-colors" style={{ color: stat.color === 'cyan' ? '#22d3ee' : '#818cf8' }} />
                </div>
                <div className={`text-4xl font-bold ${c.value} mb-1 leading-none`}>{stat.value}</div>
                <div className="text-white font-semibold text-base mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs">{stat.desc}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Database size={18} className="text-cyan-400" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-slate-200 font-medium">Data Processing:</span> Both classification and regression models were iteratively tested against these datasets to optimize predictive performance. Preprocessing involved several filters applied to signal data to reduce noise and artifacts from the HMD eye-tracking system.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

