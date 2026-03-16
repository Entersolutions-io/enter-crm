"use client";

/**
 * EnterCRM Logo — pure text logo.
 * "Enter" in white, "CRM" in indigo (#6366F1).
 */
export function Logo({
  className = "",
  height = 28,
}: {
  className?: string;
  height?: number;
}) {
  const fontSize = height * 0.78;

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      style={{
        fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "#FAFAFA" }}>Enter</span>
      <span style={{ color: "#6366F1" }}>CRM</span>
    </span>
  );
}
