export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="text-pretty text-sm font-semibold text-red-400">
      {children}
    </span>
  );
}
