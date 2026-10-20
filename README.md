# G&R Electric — Sitio web

Sitio de **Distribuciones Eléctricas G&R SAS** construido con
**Next.js 14 (App Router) + TypeScript estricto + Tailwind CSS 3**.
Identidad técnico-industrial en grafito, ámbar y cian, con experiencia
bilingüe ES/EN y flujo de cotización sin precios publicados.

> **Estado:** implementación terminada, desplegada y verificada en Vercel:
> `https://distribuiciones-electricas-g-y-r.vercel.app`.
> Repositorio:
> `https://github.com/kbdigitalstudio/distribuiciones-electricas-g-y-r-`.
> Pendiente de dominio propio, canales comerciales confirmados, backend de
> envío y datos de catálogo definitivos.

## Stack

- Next.js `14.2.35`, React `18.3.1`, TypeScript `5.5.3`
- Tailwind CSS `3.4.13`
- Tipografías: Inter (texto) y JetBrains Mono (etiquetas técnicas)
- Sin librerías de animación ni dependencias de UI adicionales

## Rutas

| Español | Inglés |
| --- | --- |
| `/es` | `/en` |
| `/es/productos` | `/en/productos` |
| `/es/nosotros` | `/en/nosotros` |
| `/es/contacto` | `/en/contacto` |
| `/es/cotizacion` | `/en/cotizacion` |

- `/` redirige a `/es` (`307`).
- Las rutas sin prefijo de idioma redirigen a `/es/...`.
- El selector de idioma conserva la ruta actual.
- `/es/cotizacion` y `/en/cotizacion` son `noindex, follow` y quedan
  excluidas de `sitemap.xml`.

## Identidad

- Grafito `#101820`, ámbar `#F5A623`, blanco técnico `#F0F3F5` y cian
  `#20B8B2`.
- El ámbar es el acento comercial; el cian se reserva para estados
  interactivos y digitales.
- Logotipo real en `public/images/logo-gyr-crop.png`, integrado sobre placa
  blanca técnica.
- Lema: «La energía de tus proyectos.» / “The energy behind your projects.”

## Catálogo

`lib/catalog.ts` centraliza **6 líneas y 24 familias** confirmadas para la
estructura del catálogo. `lib/products.ts` reexporta esos datos.

Cada familia admite los campos opcionales `id`, `slug`, `name`, `category`,
`description`, `image`, `brand`, `reference`, `specifications`, `price` y
`availability`, preparados para una futura integración con CMS o base de
datos. **Hoy no hay integración CMS/DB.**

No se publican SKU, marcas, referencias, especificaciones, precios,
existencias, plazos ni imágenes de producto verificadas. El catálogo muestra
esa ausencia de forma explícita y no simula disponibilidad.

Funciones activas:

- búsqueda por nombre, línea, descripción y campos opcionales;
- filtro por línea y limpieza de filtros;
- orden por línea (orden editorial) o por nombre;
- contador de resultados y estado vacío;
- agregar familias a la lista de cotización;
- diseño responsive y navegación por teclado.

## Flujo de cotización

- La lista se guarda **solo en el navegador** mediante `localStorage`
  (`gyr-quote-lines-v1`).
- Permite agregar familias, ajustar cantidades (1–999), quitar ítems y
  vaciar la lista con confirmación.
- El formulario solicita nombre y correo; empresa, teléfono, ciudad y notas
  son opcionales.
- Con la lista y los datos válidos se **prepara** un resumen de solicitud,
  que puede copiarse o descargarse como `.txt`.
- No hay envío automático, ni checkout, ni precios o totales inventados.
- La página indica claramente que la selección vive solo en el navegador y
  que el envío automático no está activado.

### Contacto

`POST /api/contact` valida el payload y responde intencionalmente
**`503 QUOTE_BACKEND_NOT_CONFIGURED`** porque no existe proveedor de correo,
SMTP ni CRM conectado. La interfaz muestra «canal en configuración», permite
copiar el mensaje y **nunca** muestra un éxito falso. También se puede
preparar la solicitud desde `/cotizacion`.

## SEO y metadatos

- Títulos y descripciones por página en ES/EN.
- Canonical, `hreflang` (`es`, `en`, `x-default`) y Open Graph.
- `sitemap.xml` con las 8 rutas indexables y alternates de idioma.
- `robots.txt` permite el sitio y bloquea `/api/`.
- `/cotizacion` queda fuera del sitemap y lleva `noindex`.
- En producción, `NEXT_PUBLIC_SITE_URL` apunta a
  `https://distribuiciones-electricas-g-y-r.vercel.app`. Esa es la URL
  canónica actual en canonical, Open Graph y sitemap.
- Al configurar un dominio propio, actualizar `NEXT_PUBLIC_SITE_URL` en
  Vercel y volver a desplegar.

## Ejecutar localmente

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

Variables de entorno: copiar `.env.example` a `.env.local`.

```bash
NEXT_PUBLIC_SITE_URL=https://distribuiciones-electricas-g-y-r.vercel.app
```

## Despliegue

- **Producción:** Vercel, equipo `kbdigitalstudio`.
- **URL:** `https://distribuiciones-electricas-g-y-r.vercel.app`
- **Proyecto:** `distribuiciones-electricas-g-y-r`
- **Rama de producción:** `main`
- **Git integration:** conectada al repositorio; los cambios en `main`
  generan un nuevo despliegue de producción.
- **Variable configurada:** `NEXT_PUBLIC_SITE_URL` en Production, Preview y
  Development.
- **Dominio propio:** no configurado todavía.

## Datos e integraciones pendientes

1. **Dominio propio** y actualización de la URL canónica. Hoy se usa el
   subdominio de producción de Vercel.
2. **Razón social oficial**: el repositorio original decía
   «Distribuidora Electrónica G y R SAS»; el sitio usa el nombre indicado
   para el proyecto, «Distribuciones Eléctricas G&R SAS». Confirmar antes de
   la versión definitiva.
3. **Canales comerciales**: correo, teléfono, WhatsApp, dirección exacta,
   horarios y persona responsable. No hay ninguno confirmado en la interfaz.
4. **Catálogo real**: SKU, marcas, referencias, especificaciones, precios,
   existencias, plazos, certificaciones e imágenes propias.
5. **Backend de cotización/contacto**: Resend, SMTP, CRM u otro proveedor,
   con variables de entorno, validación y manejo de errores.
6. **Contenido institucional**: historia, equipo, certificaciones, alianzas,
   cobertura y garantías solo si la empresa los confirma.
7. **Licencias y créditos de las fotografías** actuales.

### Candidatos de directorios públicos — NO publicados

Estos datos aparecen en fuentes públicas, pero **no están confirmados** y no
se usan en la interfaz:

- Teléfono: `3204485436`
- Dirección: `CALLE 14 12 65 LC 210`
- NIT: `9012534838`

No reutilizar hasta validarlos con la empresa.

## Imágenes

- `public/images/logo-gyr.png`: logotipo aportado por el proyecto.
- `public/images/logo-gyr-crop.png`: recorte técnico para el encabezado.
- `public/images/hero-electrical-panel.jpg` y las seis fotografías de
  `public/images/catalog/` son **imágenes de referencia locales**. No son
  instalaciones, productos ni proyectos de la empresa. Se etiquetan como
  «Imagen de referencia» cuando corresponde.
- Antes de la versión definitiva, sustituirlas por fotografía propia o
  documentar su licencia y crédito.

## Verificación local y producción

Última revisión: **19 de octubre de 2026**.

- `npm run typecheck`: sin errores.
- `npm run lint`: sin advertencias ni errores.
- `npm run build`: 10 rutas públicas bilingües (5 × ES/EN), más `robots.txt`,
  `sitemap.xml` y la ruta API.
- Despliegue de producción en Vercel completado y verificado.
- 60 combinaciones ruta × ancho contra producción (360, 390, 768, 1024,
  1280, 1440 px): sin desbordamiento horizontal, errores de consola, fallos
  de red ni imágenes rotas.
- Canonical de producción, 8 URLs en sitemap, `x-default`, `noindex` en
  cotización, redirecciones raíz y assets: verificados en producción.
- Contraste de texto revisado en las 10 rutas a 390 y 1280 px: sin fallos
  AA detectados; tamaño mínimo de texto 10 px para microetiquetas.
- Flujos probados: búsqueda, filtros, orden, estado vacío, alta y edición de
  cantidades, persistencia, validación, copia/descarga, menú móvil, cambio
  de idioma y respuesta 503 honesta del endpoint.
