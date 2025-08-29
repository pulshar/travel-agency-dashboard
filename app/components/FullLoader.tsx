export default function FullLoader() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-light-200 z-50"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="w-10 h-10 border-4 border-t-primary-100 border-gray-300 rounded-full animate-spin -mt-60" />
      <span className="sr-only">Loading content</span>
    </div>
  );
}