"use client";

interface ConvenioLogoProps {
  nombre: string;
}

export function ConvenioLogo({ nombre }: ConvenioLogoProps) {
  return (
    <div className="slot">
      Logo
      <span>INSERTAR AQUÍ — {nombre}</span>
    </div>
  );
}