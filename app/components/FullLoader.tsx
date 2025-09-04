import { motion } from "framer-motion";

export default function FullLoader() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-light-200/90 z-120"
      role="status"
      aria-busy="true"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="size-10 border-4 border-t-primary-100 border-gray-300 rounded-full animate-spin -mt-60" />
      <span className="sr-only">Loading content</span>
    </motion.div>
  );
}
