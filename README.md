# Phasmo Tracker

Herramienta web para jugadores de **Phasmophobia** que permite identificar fantasmas descartando opciones en tiempo real mediante evidencias clásicas y comportamientos observables.

## Funcionalidades

- **Filtro por evidencias clásicas** — EMF Nivel 5, Spirit Box, Ultravioleta, Ghost Orbs, Escritura Fantasma, Temperatura Congelante y DOTS. Cada evidencia tiene 3 estados: neutro, confirmada y descartada.
- **Filtro por comportamientos** — 42 pistas de comportamiento observables durante la partida (pasos silenciosos, no pisa la sal, caza muy seguido, etc.).
- **24 fantasmas** con tarjetas que muestran nombre, evidencias, resumen y detalle expandible.
- **Filtrado en tiempo real** — los fantasmas que no coinciden se atenúan y se reordenan automáticamente.
- **Dark theme** acorde a la estética del juego.
- **Responsive** — funciona en escritorio y móvil.

## Tech Stack

- React
- Vite
- CSS vanilla

## Instalación

```bash
git clone https://github.com/lvcas21/phasmo-tracker.git
cd phasmo-tracker
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Build

```bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/`.
