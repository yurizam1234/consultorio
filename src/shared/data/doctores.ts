export interface Doctor {
  name: string;
  specialty: string;
  desc: string;
  exp: string;
  img: string;
}

export const doctores: Doctor[] = [
  {
    name: "Dr. Edgar A. Solano Tego",
    specialty: "Oftalmología",
    desc: "Especialista en diagnóstico y tratamiento visual con más de 12 años de experiencia.",
    exp: "12 años",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80",
  },
  {
    name: "Dr. Carlos D. Cabrera Reyes",
    specialty: "Oftalmología",
    desc: "Certificado en cirugía refractiva y manejo de patologías oculares complejas.",
    exp: "10 años",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80",
  },
  {
    name: "Dr. Werner Schlie Villa",
    specialty: "Cardiología",
    desc: "Experto en prevención y tratamiento de enfermedades cardiovasculares.",
    exp: "15 años",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80",
  },
  {
    name: "Dr. Nelson J. Urbina López",
    specialty: "Medicina del dolor",
    desc: "Manejo integral del dolor crónico y agudo con enfoque multidisciplinario.",
    exp: "8 años",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  },
  {
    name: "Dr. Rubén Bañuelos",
    specialty: "Radiología",
    desc: "Jefe de imagenología, especialista en resonancia magnética y tomografía.",
    exp: "14 años",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80",
  },
];
