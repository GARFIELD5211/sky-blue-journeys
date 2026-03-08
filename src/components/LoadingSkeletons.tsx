import { motion } from "framer-motion";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

const Bone = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-lg bg-muted/60 ${shimmer} ${className}`} />
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ── Package card skeleton (Hajj / Umrah) ── */
export const PackageCardSkeleton = () => (
  <motion.div variants={item} className="glass-card rounded-2xl p-6 space-y-4">
    <Bone className="h-5 w-32" />
    <Bone className="h-4 w-20" />
    <Bone className="h-8 w-40" />
    <div className="space-y-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Bone className="h-4 w-4 rounded-full" />
          <Bone className="h-4 w-28" />
          <Bone className="h-4 w-20" />
        </div>
      ))}
    </div>
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Bone className="h-4 w-4 rounded-full" />
          <Bone className="h-4 w-24" />
        </div>
      ))}
    </div>
    <Bone className="h-10 w-full rounded-lg" />
  </motion.div>
);

export const PackageGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    {Array.from({ length: count }).map((_, i) => (
      <PackageCardSkeleton key={i} />
    ))}
  </motion.div>
);

/* ── Tour card skeleton ── */
export const TourCardSkeleton = () => (
  <motion.div variants={item} className="glass-card rounded-2xl overflow-hidden">
    <Bone className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <Bone className="h-5 w-36" />
        <Bone className="h-5 w-16 rounded-full" />
      </div>
      <Bone className="h-4 w-40" />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bone key={i} className="h-4 w-24" />
        ))}
      </div>
      <Bone className="h-6 w-28" />
      <Bone className="h-10 w-full rounded-lg" />
    </div>
  </motion.div>
);

export const TourGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
  >
    {Array.from({ length: count }).map((_, i) => (
      <TourCardSkeleton key={i} />
    ))}
  </motion.div>
);

/* ── Visa country card skeleton ── */
export const VisaCardSkeleton = () => (
  <motion.div variants={item} className="glass-card rounded-2xl p-6 space-y-4">
    <div className="flex items-center gap-3">
      <Bone className="h-10 w-10 rounded-full" />
      <div className="space-y-1.5">
        <Bone className="h-5 w-28" />
        <Bone className="h-3 w-20" />
      </div>
    </div>
    <div className="flex gap-1.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Bone key={i} className="h-5 w-16 rounded-full" />
      ))}
    </div>
    <div className="flex items-center justify-between">
      <Bone className="h-4 w-24" />
      <Bone className="h-4 w-4 rounded-full" />
    </div>
  </motion.div>
);

export const VisaGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {Array.from({ length: count }).map((_, i) => (
      <VisaCardSkeleton key={i} />
    ))}
  </motion.div>
);

/* ── Flight result skeleton ── */
export const FlightCardSkeleton = () => (
  <motion.div
    variants={item}
    className="glass-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
  >
    <div className="md:w-28 shrink-0 flex flex-col items-center gap-2">
      <Bone className="h-12 w-12 rounded-full" />
      <Bone className="h-3 w-16" />
    </div>
    <div className="flex-1 flex items-center gap-3">
      <div className="text-center space-y-1.5">
        <Bone className="h-3 w-14 mx-auto" />
        <Bone className="h-6 w-16 mx-auto" />
        <Bone className="h-3 w-20 mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center gap-1">
        <Bone className="h-3 w-12" />
        <Bone className="h-[1px] w-full" />
        <Bone className="h-2 w-10" />
      </div>
      <div className="text-center space-y-1.5">
        <Bone className="h-3 w-14 mx-auto" />
        <Bone className="h-6 w-16 mx-auto" />
        <Bone className="h-3 w-20 mx-auto" />
      </div>
    </div>
    <div className="md:w-36 shrink-0 flex flex-col items-center gap-2">
      <Bone className="h-7 w-28" />
      <Bone className="h-8 w-24 rounded-lg" />
    </div>
  </motion.div>
);

export const FlightListSkeleton = ({ count = 4 }: { count?: number }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="space-y-4"
  >
    {Array.from({ length: count }).map((_, i) => (
      <FlightCardSkeleton key={i} />
    ))}
  </motion.div>
);

/* ── Inclusion icon skeleton ── */
export const InclusionsSkeleton = ({ count = 5 }: { count?: number }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto"
  >
    {Array.from({ length: count }).map((_, i) => (
      <motion.div key={i} variants={item} className="glass-card rounded-xl p-4 flex flex-col items-center gap-2">
        <Bone className="h-8 w-8 rounded-full" />
        <Bone className="h-4 w-16" />
      </motion.div>
    ))}
  </motion.div>
);
