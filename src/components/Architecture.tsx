import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const layers = [
  {
    label: 'INPUT LAYER',
    sublabel: '24 Features',
    desc: 'Eye-tracking biometric features: pupil size, blink rate, optical flow, saccade velocity',
    color: 'cyan',
    nodes: 5,
    nodeColor: 'bg-cyan-400',
    width: 'w-48',
  },
  {
    label: 'LSTM LAYER',
    sublabel: '256 Units',
    desc: 'Long Short-Term Memory cells capturing temporal dependencies in sequential eye movement data',
    color: 'indigo',
    nodes: 6,
    nodeColor: 'bg-indigo-400',
    width: 'w-56',
  },
  {
    label: 'DROPOUT',
    sublabel: 'Rate: 0.5',
    desc: 'Regularization layer preventing overfitting by randomly deactivating 50% of neurons during training',
    color: 'slate',
    nodes: 4,
    nodeColor: 'bg-slate-400',
    width: 'w-40',
  },
  {
    label: 'GLOBAL AVG. POOLING',
    sublabel: 'Temporal Aggregation',
    desc: 'Reduces temporal dimension by averaging LSTM outputs across the sequence length',
    color: 'cyan',
    nodes: 3,
    nodeColor: 'bg-cyan-300',
    width: 'w-44',
  },
  {
    label: 'BATCH NORM.',
    sublabel: 'Normalization',
    desc: 'Stabilizes training by normalizing activations, enabling faster convergence and stable gradients',
    color: 'indigo',
    nodes: 3,
    nodeColor: 'bg-indigo-300',
    width: 'w-44',
  },
  {
    label: 'FC LAYER',
    sublabel: '64 Units',
    desc: 'Fully connected dense layer that learns high-level representations from pooled LSTM features',
    color: 'cyan',
    nodes: 4,
    nodeColor: 'bg-cyan-400',
    width: 'w-40',
  },
  {
    label: 'DROPOUT',
    sublabel: 'Rate: 0.5',
    desc: 'Second regularization layer applied before final output classification',
    color: 'slate',
    nodes: 3,
    nodeColor: 'bg-slate-400',
    width: 'w-36',
  },
  {
    label: 'OUTPUT LAYER',
    sublabel: 'Binary Classification',
    desc: 'Sigmoid activation producing probability of cybersickness — 0: Not Sick, 1: Sick',
    color: 'green',
    nodes: 1,
    nodeColor: 'bg-green-400',
    width: 'w-32',
  },
];

const colorConfig = {
  cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400', badge: 'bg-cyan-500/15 text-cyan-300' },
  indigo: { border: 'border-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-400', badge: 'bg-indigo-500/15 text-indigo-300' },
  slate: { border: 'border-slate-500/30', bg: 'bg-slate-500/10', text: 'text-slate-400', badge: 'bg-slate-500/15 text-slate-300' },
  green: { border: 'border-green-500/30', bg: 'bg-green-500/10', text: 'text-green-400', badge: 'bg-green-500/15 text-green-300' },
};

export default function Architecture() {
  return (
    <section id="architecture" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Deep Learning</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Model <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            A sequential LSTM-based neural network designed to capture temporal patterns in eye biometric data.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Flowchart column */}
          <div className="flex-1 flex flex-col items-center gap-0">
            {layers.map((layer, i) => {
              const c = colorConfig[layer.color as keyof typeof colorConfig];
              return (
                <div key={layer.label + i} className="flex flex-col items-center w-full">
                  {/* Layer card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`w-full max-w-sm glass rounded-xl border ${c.border} p-4 flex items-center gap-4 group hover:${c.bg} transition-colors`}
                  >
                    {/* Nodes visualization */}
                    <div className="flex gap-1 flex-shrink-0">
                      {Array.from({ length: Math.min(layer.nodes, 6) }).map((_, ni) => (
                        <div
                          key={ni}
                          className={`w-3 h-3 rounded-full ${layer.nodeColor} opacity-80`}
                          style={{ opacity: 0.5 + ni * 0.08 }}
                        />
                      ))}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold text-sm">{layer.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge} font-medium`}>
                          {layer.sublabel}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector arrow */}
                  {i < layers.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                      className="flex flex-col items-center py-1"
                      style={{ transformOrigin: 'top' }}
                    >
                      <div className="w-px h-4 bg-gradient-to-b from-slate-500/50 to-slate-600/50" />
                      <ArrowDown size={12} className="text-slate-600" />
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Output labels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-6 mt-4"
            >
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl border border-red-500/20">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-red-300 text-xs font-medium">NOT SICK (0)</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl border border-green-500/20">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-green-300 text-xs font-medium">SICK (1)</span>
              </div>
            </motion.div>
          </div>

          {/* Descriptions column */}
          <div className="flex-1 space-y-3">
            {layers.map((layer, i) => {
              const c = colorConfig[layer.color as keyof typeof colorConfig];
              return (
                <motion.div
                  key={layer.label + i + '-desc'}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`glass rounded-xl p-4 border ${c.border} flex gap-3 items-start`}
                >
                  <span className={`text-xs font-bold ${c.text} w-5 flex-shrink-0 mt-0.5`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className={`text-xs font-bold ${c.text} uppercase tracking-wider`}>{layer.label}</span>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{layer.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

