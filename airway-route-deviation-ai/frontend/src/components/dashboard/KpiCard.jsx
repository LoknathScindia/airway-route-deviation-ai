import { motion } from "framer-motion";

function KpiCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
    >
      {/* Accent Bar */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${color}`}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 text-white ${color}`}
        >
          <Icon size={30} />
        </div>
      </div>
    </motion.div>
  );
}

export default KpiCard;