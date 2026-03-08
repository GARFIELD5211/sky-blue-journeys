import { useState, useEffect } from "react";
import { Eye, Users, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { icon: Eye, label: "viewing now", min: 12, max: 47 },
  { icon: Users, label: "booked today", min: 3, max: 18 },
  { icon: TrendingUp, label: "inquiries today", min: 24, max: 89 },
];

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LiveTrafficWidget = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [value, setValue] = useState(() => randomInRange(stats[0].min, stats[0].max));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = (prev + 1) % stats.length;
        setValue(randomInRange(stats[next].min, stats[next].max));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Small random fluctuation within the same stat
  useEffect(() => {
    const jitter = setInterval(() => {
      setValue((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const clamped = Math.max(stats[currentIdx].min, Math.min(stats[currentIdx].max, prev + delta));
        return clamped;
      });
    }, 2500);
    return () => clearInterval(jitter);
  }, [currentIdx]);

  const current = stats[currentIdx];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="glass-card rounded-xl px-4 py-3 shadow-lg border border-border/50 flex items-center gap-3 min-w-[200px]">
        <div className="relative">
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-4.5 h-4.5 text-primary" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIdx}-${value}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-lg font-extrabold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground ml-1.5">{current.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LiveTrafficWidget;
