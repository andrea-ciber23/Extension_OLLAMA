
# Ollama Document AI

Extensión de Google Chrome para el análisis y resumen de documentos TXT mediante inteligencia artificial local con Ollama.

El proyecto permite procesar documentos, generar resúmenes, identificar conclusiones y realizar consultas sobre su contenido sin depender de servicios externos de inteligencia artificial.

## Características

- Carga de múltiples documentos TXT.
- Generación de resúmenes ejecutivos y detallados.
- Identificación de ideas principales y conclusiones.
- Detección de riesgos y recomendaciones.
- Análisis conjunto de documentos.
- Consultas en lenguaje natural sobre los archivos.
- Exportación de resultados en formato TXT.
- Procesamiento local mediante Ollama.

## Tecnologías

- HTML5 y CSS3.
- JavaScript.
- Chrome Extension Manifest V3.
- Ollama API.
- Modelos de lenguaje locales, como Qwen.

## Arquitectura

La extensión se comunica directamente con Ollama mediante el Service Worker de Chrome.

```text
Google Chrome
     |
     v
Ollama Document AI
     |
     v
Service Worker
     |
     v
Ollama API
127.0.0.1:11434
     |
     v
Modelo Qwen
```

No requiere un servidor intermediario adicional. Ollama debe permitir el origen de la extensión cuando sea necesario por su configuración CORS.

## Requisitos

- Google Chrome.
- Ollama instalado y funcionando.
- Un modelo de lenguaje descargado.
- Recursos de hardware suficientes para ejecutar el modelo.

Modelo predeterminado:

```text
qwen3.8:27b
```

## Instalación

1. Descarga o clona el repositorio.
2. Abre `chrome://extensions/` en Chrome.
3. Activa el modo desarrollador.
4. Selecciona "Cargar descomprimida".
5. Elige la carpeta del proyecto.
6. Comprueba que Ollama está funcionando.

Para comprobar la conexión:

```powershell
Invoke-RestMethod http://127.0.0.1:11434/api/tags
```

## Estructura del proyecto

```text
Ollama-Document-AI/
│
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── background.js
└── README.md
```

## Privacidad

Los documentos se procesan mediante una instancia local de Ollama. La aplicación no necesita claves API ni suscripciones a servicios externos.

La privacidad depende también de la configuración del equipo y de los servicios utilizados.

## Limitaciones

- Actualmente admite documentos TXT.
- Los PDF y DOCX no están implementados.
- El rendimiento depende del hardware y del modelo seleccionado.
- Los documentos extensos se procesan mediante fragmentos.

## Mejoras futuras

- Compatibilidad con PDF y DOCX.
- Exportación de informes en PDF.
- Historial de análisis.
- Comparación avanzada de documentos.
- Integración de búsqueda semántica (RAG).
- Compatibilidad con diferentes modelos de Ollama.

## Licencia

Proyecto distribuido bajo licencia MIT, sujeto a la inclusión del archivo LICENSE correspondiente.

## Autor

**Ollama Document AI**

Herramienta de análisis documental basada en inteligencia artificial local mediante Ollama.
