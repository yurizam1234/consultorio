"use client";

export function Motivos3DBackdrop() {
  return (
    <div className="motivos-3d-backdrop" aria-hidden="true">
      {/* Brand Aurora Ambient Glows */}
      <div className="motivos-studio-spotlight spotlight-brand-left" />
      <div className="motivos-studio-spotlight spotlight-brand-right" />
      <div className="motivos-studio-spotlight spotlight-brand-center" />

      {/* Caustics Wave Layer (Refracted light patterns in mint/teal) */}
      <div className="motivos-caustics-layer">
        <svg className="caustics-svg" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="caustic-teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20c997" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#a8e0dc" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#284d5c" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            className="caustic-wave wave-1"
            d="M0,150 C150,180 350,120 500,160 C650,200 850,130 1000,170 C1100,195 1180,160 1200,165 L1200,600 L0,600 Z"
            fill="url(#caustic-teal-grad)"
          />
          <path
            className="caustic-wave wave-2"
            d="M0,220 C200,190 400,260 600,210 C800,170 1000,240 1200,200 L1200,600 L0,600 Z"
            fill="url(#caustic-teal-grad)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Two 3D Stylized Spheres in Background (Brand Palette) */}
      <div className="motivos-spheres-container">
        {/* Left 3D Sphere: Dark Teal / Emerald with Wave Pattern */}
        <div className="motivos-sphere-wrap sphere-wrap-left">
          <svg className="sphere-3d-svg" viewBox="0 0 280 280">
            <defs>
              {/* 3D Base Radial Lighting */}
              <radialGradient id="sphere-teal-left-base" cx="30%" cy="26%" r="72%">
                <stop offset="0%" stopColor="#20c997" />
                <stop offset="28%" stopColor="#068c86" />
                <stop offset="60%" stopColor="#284d5c" />
                <stop offset="85%" stopColor="#16303a" />
                <stop offset="100%" stopColor="#081418" />
              </radialGradient>

              <clipPath id="sphere-teal-left-clip">
                <circle cx="140" cy="140" r="120" />
              </clipPath>

              {/* Wave pattern gradient */}
              <linearGradient id="wave-teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#a8e0dc" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#20c997" stopOpacity="0.3" />
              </linearGradient>

              {/* Spherical volume shading overlay */}
              <radialGradient id="sphere-teal-left-volume" cx="30%" cy="26%" r="72%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="65%" stopColor="#000000" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
              </radialGradient>
            </defs>

            <circle cx="140" cy="140" r="120" fill="url(#sphere-teal-left-base)" />

            {/* Undulating Wave Lines */}
            <g clipPath="url(#sphere-teal-left-clip)">
              <path d="M 0,60 Q 70,30 140,60 T 280,60" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="7" opacity="0.5" />
              <path d="M 0,90 Q 70,60 140,90 T 280,90" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="9" opacity="0.7" />
              <path d="M 0,120 Q 70,90 140,120 T 280,120" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="11" opacity="0.85" />
              <path d="M 0,150 Q 70,120 140,150 T 280,150" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="12" opacity="0.95" />
              <path d="M 0,180 Q 70,150 140,180 T 280,180" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="11" opacity="0.85" />
              <path d="M 0,210 Q 70,180 140,210 T 280,210" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="9" opacity="0.7" />
              <path d="M 0,240 Q 70,210 140,240 T 280,240" fill="none" stroke="url(#wave-teal-grad)" strokeWidth="7" opacity="0.5" />

              <circle cx="140" cy="140" r="120" fill="url(#sphere-teal-left-volume)" />
            </g>

            {/* Specular Studio Softbox Glare */}
            <ellipse cx="92" cy="80" rx="36" ry="20" transform="rotate(-30 92 80)" fill="#ffffff" opacity="0.45" filter="blur(5px)" />
            <ellipse cx="84" cy="74" rx="14" ry="7" transform="rotate(-30 84 74)" fill="#ffffff" opacity="0.9" filter="blur(1.5px)" />
          </svg>
        </div>

        {/* Right 3D Sphere: Mint & Teal with Zigzag Steps and Dots */}
        <div className="motivos-sphere-wrap sphere-wrap-right">
          <svg className="sphere-3d-svg" viewBox="0 0 280 280">
            <defs>
              {/* 3D Base Radial Lighting */}
              <radialGradient id="sphere-teal-right-base" cx="30%" cy="26%" r="72%">
                <stop offset="0%" stopColor="#a8e0dc" />
                <stop offset="28%" stopColor="#20c997" />
                <stop offset="60%" stopColor="#068c86" />
                <stop offset="85%" stopColor="#284d5c" />
                <stop offset="100%" stopColor="#122831" />
              </radialGradient>

              <clipPath id="sphere-teal-right-clip">
                <circle cx="140" cy="140" r="120" />
              </clipPath>

              {/* Spherical volume shading overlay */}
              <radialGradient id="sphere-teal-right-volume" cx="30%" cy="26%" r="72%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="65%" stopColor="#000000" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
              </radialGradient>
            </defs>

            <circle cx="140" cy="140" r="120" fill="url(#sphere-teal-right-base)" />

            {/* Geometric "Zigzag Steps" and Dot Matrix in Brand Tones */}
            <g clipPath="url(#sphere-teal-right-clip)">
              <path
                d="M 25,65 L 60,65 L 60,90 L 100,90 L 100,115 L 140,115 L 140,140 L 180,140 L 180,165 L 220,165 L 220,190 L 255,190"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 15,105 L 50,105 L 50,130 L 90,130 L 90,155 L 130,155 L 130,180 L 170,180 L 170,205 L 210,205 L 210,230 L 245,230"
                fill="none"
                stroke="#d4f4f1"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M 40,25 L 75,25 L 75,50 L 115,50 L 115,75 L 155,75 L 155,100 L 195,100 L 195,125 L 235,125 L 235,150"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Dot Matrix along steps */}
              <circle cx="60" cy="65" r="4" fill="#ffffff" opacity="0.95" />
              <circle cx="100" cy="90" r="4.5" fill="#ffffff" opacity="1" />
              <circle cx="140" cy="115" r="5" fill="#ffffff" opacity="1" />
              <circle cx="180" cy="140" r="4.5" fill="#ffffff" opacity="0.95" />
              <circle cx="220" cy="165" r="4" fill="#ffffff" opacity="0.9" />

              <circle cx="50" cy="105" r="3.5" fill="#d4f4f1" opacity="0.85" />
              <circle cx="90" cy="130" r="4" fill="#d4f4f1" opacity="0.9" />
              <circle cx="130" cy="155" r="4.5" fill="#d4f4f1" opacity="0.95" />
              <circle cx="170" cy="180" r="4" fill="#d4f4f1" opacity="0.9" />
              <circle cx="210" cy="205" r="3.5" fill="#d4f4f1" opacity="0.85" />

              <circle cx="75" cy="25" r="3" fill="#ffffff" opacity="0.75" />
              <circle cx="115" cy="50" r="3.5" fill="#ffffff" opacity="0.8" />
              <circle cx="155" cy="75" r="4" fill="#ffffff" opacity="0.85" />
              <circle cx="195" cy="100" r="3.5" fill="#ffffff" opacity="0.8" />

              <circle cx="140" cy="140" r="120" fill="url(#sphere-teal-right-volume)" />
            </g>

            {/* Specular Studio Softbox Glare */}
            <ellipse cx="92" cy="80" rx="38" ry="22" transform="rotate(-30 92 80)" fill="#ffffff" opacity="0.5" filter="blur(5px)" />
            <ellipse cx="84" cy="74" rx="15" ry="7.5" transform="rotate(-30 84 74)" fill="#ffffff" opacity="0.95" filter="blur(1.5px)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
