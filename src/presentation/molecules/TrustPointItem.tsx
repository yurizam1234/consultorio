interface TrustPointItemProps {
  text: string;
}

export function TrustPointItem({ text }: TrustPointItemProps) {
  return (
    <li>
      <span className="check">✓</span> {text}
    </li>
  );
}
