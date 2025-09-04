export default function BtnLoader({borderColor}:{borderColor: string}) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div className={`size-[18px] border-2 border-t-primary-100 ${borderColor} rounded-full animate-spin`} />
      <span className="sr-only">Loading content</span>
    </div>
  );
}