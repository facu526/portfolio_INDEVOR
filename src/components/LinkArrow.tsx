type LinkArrowProps = Readonly<{
  direction?: "up-right" | "down-right" | "left";
  className?: string;
}>;

export function LinkArrow({
  direction = "up-right",
  className = "",
}: LinkArrowProps) {
  const path = {
    "up-right": "M5 15 15 5M7 5h8v8",
    "down-right": "M5 5l10 10M15 7v8H7",
    left: "M15 5 5 15M5 7v8h8",
  }[direction];

  return (
    <svg
      className={["link-arrow", className].filter(Boolean).join(" ")}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
