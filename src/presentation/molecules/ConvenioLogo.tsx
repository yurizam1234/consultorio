"use client";

import Image from "next/image";

interface ConvenioLogoProps {
  nombre: string;
  logo: string;
}

export function ConvenioLogo({ nombre, logo }: ConvenioLogoProps) {
  return (
    <div className="slot convenio-logo-slot">
      <Image
        src={logo}
        alt={nombre}
        fill
        sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, 15vw"
        className="convenio-logo-img"
      />
    </div>
  );
}
