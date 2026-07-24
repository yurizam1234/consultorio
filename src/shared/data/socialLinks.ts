import type { IconName } from "@/presentation/atoms/Icon";

export interface SocialLink {
  platform: string;
  href: string;
  icon: IconName;
}

// Placeholders: reemplaza cada href con la URL real del hospital cuando la tengas.
export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "#", icon: "facebook" },
  { platform: "Instagram", href: "#", icon: "instagram" },
  { platform: "TikTok", href: "#", icon: "tiktok" },
];
