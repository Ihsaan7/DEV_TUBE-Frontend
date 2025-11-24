const Spinner = ({
  size = "md",
  variant = "ring", // ring | dots | pulse
  className = "",
  label,
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const ringBorder = {
    sm: "border-2",
    md: "border-[3px]",
    lg: "border-4",
  };

  const renderRing = () => (
    <div
      className={`${sizes[size]} ${ringBorder[size]} border-orange-500/90 border-t-transparent rounded-full animate-spin ${className}`}
      aria-label={label || "Loading"}
    />
  );

  const renderPulse = () => (
    <div className={`relative ${className}`} aria-label={label || "Loading"}>
      <div
        className={`${sizes[size]} rounded-full bg-orange-500/30 blur-[1px] animate-ping`}
      />
      <div
        className={`absolute inset-0 ${sizes[size]} rounded-full border ${ringBorder[size]} border-orange-500/70`}
      />
    </div>
  );

  const dotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const renderDots = () => (
    <div className={`flex items-center gap-1 ${className}`} aria-label={label || "Loading"}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`inline-block ${dotSize[size]} rounded-full bg-orange-500 animate-bounce`}
          style={{ animationDelay: `${i * 200}ms`, animationDuration: "800ms" }}
        />
      ))}
    </div>
  );

  if (variant === "dots") return renderDots();
  if (variant === "pulse") return renderPulse();
  return renderRing();
};

export default Spinner;
