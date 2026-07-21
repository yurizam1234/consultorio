interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}
