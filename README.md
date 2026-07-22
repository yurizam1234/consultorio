# arboleras-consultorio

Sitio web de SH Arboledas — hospital y centro de diagnóstico en Tuxtla Gutiérrez, Chiapas.

Construido con Next.js (App Router) + TypeScript, siguiendo **Clean Architecture** (`domain` / `application` /
`infrastructure`) y **Atomic Design** (`presentation/atoms` → `molecules` → `organisms` → `templates`).

```
src/
├── domain/            # Entidades e interfaces de repositorio
├── application/        # Casos de uso (CrearCitaUseCase, EnviarMensajeUseCase)
├── infrastructure/     # Implementaciones (repos locales de demo) + container.ts (DI)
├── presentation/
│   ├── atoms/           # Icon, Button, Chip, Reveal...
│   ├── molecules/        # SectionHead, StepCard, TestimonialCardItem...
│   ├── organisms/        # Navbar, Hero, Contacto, ScrollEffects, EmergencyModal...
│   ├── templates/        # LandingTemplate
│   └── hooks/            # useCitaBooking, useContactForm, useCarousel... (únicos que importan `container`)
├── shared/             # data estática del sitio + utils
└── app/                # rutas de Next.js (App Router)
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).
