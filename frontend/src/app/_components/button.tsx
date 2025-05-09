export default function Button({
  type = "button",
  children,
  className = "",
}: {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`font-bold p-2 py-2 bg-accent text-inverted uppercase text-sm flex justify-center items-center ${className} border-primary/70 focus:border-primary focus:outline-0 border rounded hover:shadow  ease-in-out hover:bg-accent/80 transition-all `}
    >
      {children}
    </button>
  );
}
