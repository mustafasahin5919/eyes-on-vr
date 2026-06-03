import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CircularMetricProps {
  label: string;
  value: number;
  displayValue: string;
  color: string;
  trackColor: string;
  delay?: number;
}

function CircularMetric({ label, value, displayValue, color, trackColor, delay = 0 }: CircularMetricProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animated ? value / 100 : 0) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/5 hover:border-cyan-500/20 transition-colors"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke={trackColor} strokeWidth="6" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: `stroke-dashoffset 1.2s ease ${delay}s` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{displayValue}</span>
        </div>
      </div>
      <span className="text-slate-300 text-sm font-medium tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

interface StatBadgeProps {
  label: string;
  value: string;
  color: string;
}

function StatBadge({ label, value, color }: StatBadgeProps) {
  return (
    <div className={`glass rounded-xl p-5 border ${color} text-center`}>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

const confusionMatrix = [
  { label: 'TN', value: 11379, color: 'bg-cyan-500/20 text-cyan-300', border: 'border-cyan-500/20' },
  { label: 'FP', value: 4275, color: 'bg-red-500/20 text-red-300', border: 'border-red-500/20' },
  { label: 'FN', value: 2252, color: 'bg-orange-500/20 text-orange-300', border: 'border-orange-500/20' },
  { label: 'TP', value: 3305, color: 'bg-green-500/20 text-green-300', border: 'border-green-500/20' },
];

export default function Results() {
  return (
    <section id="results" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Evaluation</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Results & <span className="gradient-text">Metrics</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Model performance on held-out test subjects.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Binary Classification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
            <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold px-4 glass py-2 rounded-full border border-cyan-500/20">
              Binary Classification
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Circular metrics */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-slate-300 text-sm font-medium mb-6 text-center">Model Performance on Test Set</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <CircularMetric label="Accuracy" value={71.00} displayValue="71.00%" color="#22d3ee" trackColor="rgba(34,211,238,0.15)" delay={0} />
                <CircularMetric label="Precision" value={73.24} displayValue="73.24%" color="#818cf8" trackColor="rgba(129,140,248,0.15)" delay={0.1} />
                <CircularMetric label="Recall" value={69.51} displayValue="69.51%" color="#22d3ee" trackColor="rgba(34,211,238,0.15)" delay={0.2} />
                <CircularMetric label="F1 Score" value={70.50} displayValue="70.50%" color="#818cf8" trackColor="rgba(129,140,248,0.15)" delay={0.3} />
              </div>
            </div>

            {/* Confusion Matrix */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-slate-300 text-sm font-medium mb-6 text-center">Confusion Matrix</h3>
              <div className="flex flex-col items-center gap-3">
                {/* Axis labels */}
                <div className="flex items-center gap-2 text-xs text-slate-500 self-start ml-16">
                  <span className="w-24 text-center">Predicted: Healthy (0)</span>
                  <span className="w-24 text-center">Predicted: Sick (1)</span>
                </div>

                <div className="flex gap-2 items-start">
                  <div className="flex flex-col gap-2 text-xs text-slate-500 justify-center mt-2">
                    <span className="w-14 text-right text-xs">Actual: (0)</span>
                    <span className="w-14 text-right text-xs mt-8">Actual: (1)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {confusionMatrix.map((cell) => (
                      <motion.div
                        key={cell.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5 }}
                        className={`w-24 h-24 rounded-xl border ${cell.border} ${cell.color} flex flex-col items-center justify-center gap-1`}
                      >
                        <span className="text-xl font-bold">{cell.value.toLocaleString()}</span>
                        <span className="text-xs font-medium opacity-70">{cell.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-cyan-400" />True Negative</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-green-400" />True Positive</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-red-400" />False Positive</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-orange-400" />False Negative</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}

function RegressionChart() {
  const points = useRef(generateSeries());

  return (
    <div className="w-full h-44 relative">
      <svg className="w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradPred" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 35, 70, 105, 140].map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {/* Actual line */}
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          points={points.current.actual.map((p, i) => `${i * (400 / 99)},${p}`).join(' ')}
          fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9"
        />

        {/* Predicted line */}
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
          points={points.current.predicted.map((p, i) => `${i * (400 / 99)},${p}`).join(' ')}
          fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8"
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-4 h-0.5 bg-cyan-400 inline-block" />Actual
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-4 h-0.5 bg-red-400 inline-block border-dashed" style={{ borderTop: '2px dashed #f87171', background: 'none' }} />Predicted
        </span>
      </div>
    </div>
  );
}

function generateSeries() {
  const actual: number[] = [];
  const predicted: number[] = [];
  let v = 70;
  for (let i = 0; i < 100; i++) {
    v = Math.max(10, Math.min(130, v + (Math.random() - 0.5) * 30));
    actual.push(v);
    predicted.push(Math.max(10, Math.min(130, v + (Math.random() - 0.5) * 20)));
  }
  return { actual, predicted };
}

