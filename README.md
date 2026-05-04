# Portafolio Profesional - Juan Alberto Puente Aguilar

Este proyecto contiene el portafolio profesional y CV web de Juan Alberto Puente Aguilar, Frontend Developer especializado en Angular y QA Automation.

## 🚀 Tecnologías Utilizadas

*   **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
*   **Animaciones**: Sistema de partículas (Moléculas) dinámico en Canvas.
*   **Diseño**: Estética moderna con Dark Mode, Glassmorphism y tipografía optimizada.
*   **Herramientas**:
    *   **Puppeteer**: Para la generación de CV en PDF de alta fidelidad desde la web.
    *   **Http-server**: Para pruebas locales.
    *   **FontAwesome**: Iconografía profesional.

## 📂 Estructura del Proyecto

```text
web-main/
├── cv-web/             # Versión web del CV (fuente del PDF)
│   ├── index.html
│   └── style.css
├── docs/               # Archivos generados (PDF del CV)
├── images/             # Activos visuales y capturas de proyectos
├── index.html          # Página principal del Portafolio
├── scriptportfolio.js  # Lógica interactiva, modales y partículas
├── style.css           # Estilos globales del portafolio
├── gen_pdf.js          # Script de generación de PDF con Puppeteer
└── package.json        # Configuración de scripts NPM
```

## 🛠️ Comandos Disponibles

Asegúrate de tener instalado [Node.js](https://nodejs.org/) antes de comenzar.

### 1. Iniciar Servidor Local
Para visualizar el proyecto localmente con recarga automática:
```bash
npm start
```

### 2. Generar CV en PDF
Si realizas cambios en `cv-web/index.html` y quieres actualizar el archivo PDF en la carpeta `docs`:
```bash
npm run generate-pdf
```

## 📋 Requisitos Previos

Si es la primera vez que descargas el proyecto, instala las dependencias necesarias:
```bash
npm install
```

## 👤 Autor

*   **Nombre**: Juan Alberto Puente Aguilar
*   **Rol**: Frontend Developer
*   **Contacto**: juan.alberto.puente.aguilar@gmail.com
*   **LinkedIn**: [linkedin.com/in/juanalbertopuenteaguilar](https://www.linkedin.com/in/juanalbertopuenteaguilar)

---
© 2024 Juan Alberto Puente Aguilar. Todos los derechos reservados.