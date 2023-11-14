export function formatNumberCompact(num) {
  return (
    num &&
    Intl.NumberFormat("en-US", {
      compactDisplay: "short",
      notation: "compact",
    }).format(num)
  );
}
