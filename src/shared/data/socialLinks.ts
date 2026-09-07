import type { IconName } from "@/presentation/atoms/Icon";

export interface SocialLink {
  platform: string;
  href: string;
  icon: IconName;
}

// TikTok sigue como placeholder: reemplaza el href cuando tengas la URL real.
export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "https://www.facebook.com/SHospitalarioArboledas/", icon: "facebook" },
  { platform: "Instagram", href: "https://www.instagram.com/s.h.arboledas", icon: "instagram" },
  { platform: "TikTok", href: "#", icon: "tiktok" },
];
