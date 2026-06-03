import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Filter, BarChart2, BrainCircuit, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Monitor,
    number: '01',
    title: 'Data Collection',
    subtitle: 'Real-time eye metrics captured using HMD device',
    desc: 'Eye-tracking data was recorded during VR sessions using a head-mounted display with integrated eye-tracking sensors capturing gaze, pupil dilation, and blink patterns at high frequency.',
    color: 'cyan',
  },
  {
    icon: Filter,
    number: '02',
    title: 'Preprocessing',
    subtitle: 'Several filters applied to signal data to reduce noise',
    desc: 'Raw biometric signals were cleaned using low-pass filtering, outlier removal, and normalization techniques to prepare data for downstream feature extraction.',
    color: 'indigo',
  },
  {
    icon: BarChart2,
    number: '03',
    title: 'Feature Engineering',
    subtitle: 'Statistical and behavioral features extracted from data',
    desc: '623 discriminative features were engineered from raw signals, including pupil size statistics, blink frequency, saccade velocity, and optical flow magnitude metrics.',
    color: 'cyan',
  },
  {
    icon: BrainCircuit,
    number: '04',
    title: 'Model Training',
    subtitle: 'Deep Learning model trained with clean data',
    desc: 'An BiLSTM-Attention-based sequential model was trained on windowed time-series data, leveraging the temporal dynamics of eye movement patterns to predict cybersickness onset.',
    color: 'indigo',
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Prediction',
    subtitle: 'Predict Cybersickness level of user',
    desc: 'The trained model outputs binary classification (sick/not sick) and continuous regression scores, enabling real-time monitoring and proactive VR experience adaptation.',
    color: 'cyan',
  },
];

const colorMap = {
  cyan: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    connector: 'from-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  indigo: {
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    connector: 'from-indigo-500/30',
    glow: 'shadow-indigo-500/20',
    dot: 'bg-indigo-400',
  },
};

export default function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pipeline" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Methodology</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Project <span className="gradient-text">Pipeline</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            A systematic, end-to-end workflow from raw biometric data to cybersickness prediction.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Horizontal flow - desktop */}
        <div ref={ref} className="hidden lg:flex items-start gap-0 relative mb-16">
          {steps.map((step, i) => {
            const c = colorMap[step.color as keyof typeof colorMap];
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-start flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex-1 flex flex-col items-center text-center px-2"
                >
                  {/* Icon circle */}
                  <div className={`relative w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 shadow-lg ${c.glow}`}>
                    <Icon size={24} className={c.text} />
                    <span className={`absolute -top-2 -right-2 text-xs font-bold ${c.text} ${c.bg} border ${c.border} rounded-full w-6 h-6 flex items-center justify-center`}>
                      {i + 1}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold uppercase tracking-wide ${c.text} mb-1`}>{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.subtitle}</p>
                </motion.div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                    className="flex-shrink-0 flex items-center self-center mb-8"
                    style={{ transformOrigin: 'left' }}
                  >
                    <ArrowRight size={20} className="text-slate-600" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical flow - mobile/tablet */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => {
            const c = colorMap[step.color as keyof typeof colorMap];
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4">
                {/* Left line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <Icon size={18} className={c.text} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-slate-600 to-transparent mt-2 min-h-[2rem]" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex-1 glass rounded-xl p-5 border ${c.border} mb-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${c.text} tracking-widest`}>{step.number}</span>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">{step.title}</h3>
                  </div>
                  <p className={`text-xs font-medium ${c.text} mb-2`}>{step.subtitle}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Detail cards - desktop */}
        <div className="hidden lg:grid grid-cols-5 gap-3">
          {steps.map((step, i) => {
            const c = colorMap[step.color as keyof typeof colorMap];
            return (
              <motion.div
                key={step.title + '-detail'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass rounded-xl p-4 border ${c.border}`}
              >
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

