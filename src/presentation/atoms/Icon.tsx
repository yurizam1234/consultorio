export type IconName =
  | "calendar"
  | "calendar-hours"
  | "check-circle"
  | "check"
  | "shield-check"
  | "monitor"
  | "clock"
  | "bolt"
  | "heart"
  | "building"
  | "arrow-right"
  | "phone"
  | "chat"
  | "mail"
  | "layers"
  | "pin"
  | "video"
  | "star"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "copy"
  | "headset"
  | "bot"
  | "sparkles"
  | "send"
  | "rotate-ccw"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "whatsapp"
  | "menu"
  | "info"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  copy: (
    <>
      <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  headset: (
    <>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      <path d="M21 16v2a3 3 0 0 1-3 3h-5" />
    </>
  ),
  bot: (
    <>
      <path d="M12 2v3M8 2h8" />
      <rect width="18" height="13" x="3" y="5" rx="3.5" ry="3.5" />
      <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="10.5" r="1.5" fill="currentColor" />
      <path d="M9 14.5h6" />
      <path d="M1 10.5v2M23 10.5v2" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  "rotate-ccw": (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3h6M9 8h6M9 13h6M9 18h3" />
    </>
  ),
  "calendar-hours": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 5-5" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  bolt: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />,
  heart: <path d="M20.8 8.6c0 4.7-8.8 10.4-8.8 10.4S3.2 13.3 3.2 8.6a4.6 4.6 0 0 1 8.8-2 4.6 4.6 0 0 1 8.8 2Z" />,
  building: (
    <>
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  "arrow-right": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2Z" />
  ),
  chat: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  pin: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />,
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3Z" />
    </>
  ),
  star: <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />,
  "chevron-left": <polyline points="15 6 9 12 15 18" />,
  "chevron-right": <polyline points="9 6 15 12 9 18" />,
  facebook: <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  tiktok: (
    <path d="M15 3v10.5a2.75 2.75 0 1 1-2.75-2.75c.26 0 .51.03.75.09V7.7a5.75 5.75 0 1 0 5 5.7V9.2A6.3 6.3 0 0 0 21 10.5V7.4a4 4 0 0 1-3-1.3A4 4 0 0 1 17 3h-2Z" />
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8.9 19.4L3 21Z" />
      <path d="M8.5 9.3c.3 2.7 2.5 4.9 5.2 5.2.5.05 1-.2 1.2-.7l.25-.6a.75.75 0 0 0-.4-.95l-1.3-.55a.75.75 0 0 0-.85.2l-.3.35a5.5 5.5 0 0 1-2.15-2.15l.35-.3a.75.75 0 0 0 .2-.85l-.55-1.3a.75.75 0 0 0-.95-.4l-.6.25a1 1 0 0 0-.7 1.2Z" />
    </>
  ),
  menu: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function Icon({ name, fill = "none", stroke = "currentColor", strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
