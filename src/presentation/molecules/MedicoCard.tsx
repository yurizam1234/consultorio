"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface MedicoCardProps {
  nombre: string;
  especialidad: string;

  foto?: string;
  cedula?: string;
  descripcion?: string | null;
  credenciales?: string[];

  className?: string;
}

export function MedicoCard({
  nombre,
  especialidad,
  foto,
  cedula,
  descripcion,
  credenciales,
  className,
}: MedicoCardProps) {
  return (
    <div className={cn("medico", className)}>
      <div className="slot medico-photo-slot">
        {foto ? (
          <Image
            src={foto}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="medico-photo-img"
          />
        ) : (
          <>
            Retrato
            <span>Fotografía no disponible</span>
          </>
        )}
      </div>

      <div className="txt">
        <h4>{nombre}</h4>

        <p className="esp">
          {especialidad}
        </p>

        {cedula && (
          <p className="ced">
            {cedula}
          </p>
        )}

        {credenciales && credenciales.length > 0 && (
          <div className="medico-credenciales">
            {credenciales.map((credencial) => (
              <p key={credencial}>
                {credencial}
              </p>
            ))}
          </div>
        )}

        {descripcion && (
          <p className="medico-descripcion">
            {descripcion}
          </p>
        )}
      </div>
    </div>
  );
}
