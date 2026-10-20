export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "es";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export interface NavLabels {
  home: string;
  products: string;
  about: string;
  contact: string;
  quote: string;
  menuOpen: string;
  menuClose: string;
  skipToContent: string;
}

export interface Dictionary {
  nav: NavLabels;
  header: {
    quoteCta: string;
    quoteList: string;
    quoteCount: string;
    quoteCountOne: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageCaption: string;
    imageLabel: string;
    rail: string[];
    chip: string;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
    note: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    description: string;
    explore: string;
    viewAll: string;
    families: string;
    lineLabel: string;
    imageNote: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    add: string;
    added: string;
    quoteNote: string;
    viewAll: string;
    categoryLabel: string;
  };
  value: {
    eyebrow: string;
    title: string;
    description: string;
    points: { title: string; description: string }[];
    cta: string;
    imageCaption: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    company: string;
    catalog: string;
    contactTitle: string;
    rights: string;
    location: string;
    channelNote: string;
    quoteCta: string;
    backToTop: string;
    statusLabel: string;
    statusValue: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryFilter: string;
    allCategories: string;
    sortLabel: string;
    sortCategory: string;
    sortName: string;
    resultsPrefix: string;
    of: string;
    familySingular: string;
    familyPlural: string;
    linePlural: string;
    quoteOnRequest: string;
    clearFilters: string;
    activeFilters: string;
    noResultsTitle: string;
    noResultsBody: string;
    reset: string;
    add: string;
    added: string;
    quoteNote: string;
    catalogNote: string;
    missingDataTitle: string;
    missingDataBody: string;
    generalQuote: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    introTitle: string;
    introBody: string[];
    focusTitle: string;
    focusBody: string;
    principles: { title: string; description: string }[];
    categoriesTitle: string;
    categoriesBody: string;
    processTitle: string;
    processBody: string;
    note: string;
    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    formTitle: string;
    channelNoticeTitle: string;
    channelNoticeBody: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    companyOptional: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneOptional: string;
    reason: string;
    reasonPlaceholder: string;
    reasons: { value: string; label: string }[];
    message: string;
    messagePlaceholder: string;
    quoteListTitle: string;
    quoteListBody: string;
    quoteListBodyOne: string;
    quoteListEmpty: string;
    quoteListLink: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    notConfiguredTitle: string;
    notConfiguredBody: string;
    copy: string;
    copied: string;
    copyError: string;
    errorTitle: string;
    errorBody: string;
    required: string;
    invalidEmail: string;
    tooShort: string;
    infoTitle: string;
    infoBody: string;
    statusLabel: string;
    statusValue: string;
    beforeTitle: string;
    beforeItems: string[];
    privacy: string;
    quoteItemsIncluded: string;
  };
  quote: {
    eyebrow: string;
    title: string;
    description: string;
    loading: string;
    itemsTitle: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    quantity: string;
    decrease: string;
    increase: string;
    remove: string;
    clear: string;
    clearConfirm: string;
    confirm: string;
    cancel: string;
    summaryTitle: string;
    itemsCount: string;
    itemSingular: string;
    units: string;
    localNote: string;
    formTitle: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    companyOptional: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneOptional: string;
    city: string;
    cityPlaceholder: string;
    cityOptional: string;
    notes: string;
    notesPlaceholder: string;
    prepare: string;
    preparedTitle: string;
    preparedBody: string;
    copy: string;
    download: string;
    copied: string;
    copyError: string;
    reset: string;
    channelNote: string;
    required: string;
    invalidEmail: string;
    requestHeading: string;
    dateLabel: string;
    itemsHeading: string;
    contactHeading: string;
    notesHeading: string;
    quantityShort: string;
    priceNote: string;
    downloadName: string;
    noItems: string;
    missingContact: string;
  };
  meta: {
    homeTitle: string;
    homeDescription: string;
    productsTitle: string;
    productsDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    quoteTitle: string;
    quoteDescription: string;
  };
}

const es: Dictionary = {
  nav: {
    home: "Inicio",
    products: "Productos",
    about: "Nosotros",
    contact: "Contacto",
    quote: "Cotización",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    skipToContent: "Saltar al contenido principal",
  },
  header: {
    quoteCta: "Solicitar cotización",
    quoteList: "Ver lista de cotización",
    quoteCount: "ítems en la lista",
    quoteCountOne: "ítem en la lista",
  },
  hero: {
    eyebrow: "Material eléctrico · Baja y media tensión",
    titleA: "La energía de",
    titleAccent: "tus proyectos.",
    description:
      "Materiales eléctricos para conectar ideas, instalaciones y soluciones.",
    primaryCta: "Explorar catálogo",
    secondaryCta: "Solicitar cotización",
    imageCaption: "Panel de distribución · Imagen de referencia",
    imageLabel: "BT / MT",
    rail: ["Catálogo por líneas", "Atención por cotización", "Bogotá D.C., Colombia"],
    chip: "Distribución eléctrica",
  },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "De la necesidad a la cotización, sin saltos.",
    description:
      "Un proceso corto para entender qué necesitas y preparar una solicitud clara.",
    steps: [
      {
        title: "Identificamos la necesidad",
        description:
          "Revisamos la línea, el uso previsto y las cantidades que tienes definidas.",
      },
      {
        title: "Revisamos referencias",
        description:
          "Contrastamos nombres, medidas o referencias disponibles antes de cotizar.",
      },
      {
        title: "Preparamos la cotización",
        description:
          "Organizamos la solicitud por líneas y familias para facilitar la revisión comercial.",
      },
      {
        title: "Coordinamos el suministro",
        description:
          "Confirmamos alcance y condiciones por el canal oficial que defina la empresa.",
      },
    ],
    note: "Los precios, referencias y la disponibilidad se confirman en la cotización.",
  },
  categories: {
    eyebrow: "Catálogo",
    title: "Seis líneas. Una lógica técnica.",
    description:
      "El portafolio se organiza por líneas y familias de producto. Sin precios publicados: cada solicitud se revisa y se cotiza.",
    explore: "Explorar línea",
    viewAll: "Ver todas las familias",
    families: "familias",
    lineLabel: "Línea",
    imageNote: "Imagen de referencia",
  },
  featured: {
    eyebrow: "Selección",
    title: "Familias listas para tu solicitud.",
    description:
      "Agrega familias a la lista, ajusta cantidades y prepara una solicitud ordenada. Las referencias exactas se confirman en la cotización.",
    add: "Agregar a cotización",
    added: "Agregada",
    quoteNote: "Sin precio publicado · Cotización por solicitud",
    viewAll: "Ver catálogo completo",
    categoryLabel: "Línea",
  },
  value: {
    eyebrow: "Criterio comercial",
    title: "Menos ruido. Más precisión.",
    description:
      "La compra de material eléctrico exige claridad: qué se necesita, para qué instalación y en qué cantidad. El sitio está construido alrededor de esa conversación.",
    points: [
      {
        title: "Información sin inventar",
        description:
          "No publicamos referencias, marcas ni precios que la empresa no haya confirmado.",
      },
      {
        title: "Catálogo por familias",
        description:
          "Una estructura legible para ubicar la línea correcta antes de cotizar.",
      },
      {
        title: "Solicitud portable",
        description:
          "Tu lista se guarda en este navegador y puede copiarse o descargarse.",
      },
    ],
    cta: "Preparar mi solicitud",
    imageCaption: "Infraestructura eléctrica · Imagen de referencia",
  },
  cta: {
    eyebrow: "Siguiente paso",
    title: "¿Tienes una lista de materiales?",
    description:
      "Cuéntanos qué líneas necesitas. Revisaremos la solicitud y prepararemos la cotización por los canales oficiales.",
    primary: "Preparar solicitud",
    secondary: "Ver catálogo",
  },
  footer: {
    tagline:
      "Materiales eléctricos para conectar ideas, instalaciones y soluciones.",
    company: "Empresa",
    catalog: "Catálogo",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    location: "Bogotá D.C., Colombia",
    channelNote:
      "Canales telefónicos y de correo en proceso de confirmación.",
    quoteCta: "Lista de cotización",
    backToTop: "Volver arriba",
    statusLabel: "Estado del canal",
    statusValue: "En configuración",
  },
  catalog: {
    eyebrow: "Catálogo",
    title: "Familias de producto",
    description:
      "Busca por línea o familia, agrega lo que necesitas y prepara tu solicitud. Los precios, referencias y existencias se confirman en la cotización.",
    searchLabel: "Buscar en el catálogo",
    searchPlaceholder: "Ej. THHN, tubería PVC, puesta a tierra…",
    categoryFilter: "Filtrar por línea",
    allCategories: "Todas las líneas",
    sortLabel: "Ordenar",
    sortCategory: "Por línea",
    sortName: "Por nombre",
    resultsPrefix: "Mostrando",
    of: "de",
    familySingular: "familia",
    familyPlural: "familias",
    linePlural: "líneas",
    quoteOnRequest: "Cotización por solicitud",
    clearFilters: "Limpiar filtros",
    activeFilters: "Filtros activos",
    noResultsTitle: "No encontramos coincidencias",
    noResultsBody:
      "Prueba con otra palabra o revisa todas las líneas disponibles.",
    reset: "Ver todo el catálogo",
    add: "Agregar",
    added: "Agregada",
    quoteNote: "Precio y referencia se confirman al cotizar.",
    catalogNote:
      "Este catálogo organiza líneas y familias a partir de la información disponible. No publica SKUs, marcas, precios ni existencias.",
    missingDataTitle: "Faltan datos comerciales",
    missingDataBody:
      "Las referencias, especificaciones, marcas y precios aún no están confirmados. El equipo comercial los valida en cada cotización.",
    generalQuote: "Solicitar cotización general",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Distribución eléctrica con criterio técnico.",
    description:
      "Distribuciones Eléctricas G&R SAS organiza su oferta en seis líneas de material eléctrico y atiende solicitudes de cotización de forma directa.",
    introTitle: "Una operación enfocada en el material correcto.",
    introBody: [
      "Nuestro trabajo consiste en conectar una necesidad de instalación con el material eléctrico adecuado. Por eso organizamos el portafolio por líneas y familias, y revisamos cada solicitud antes de cotizar.",
      "La información publicada se limita a lo verificable. Los datos comerciales que aún no están confirmados se gestionan directamente en la cotización.",
    ],
    focusTitle: "Nuestro enfoque",
    focusBody:
      "Precisión en la referencia, claridad en la cotización y una comunicación directa con quien necesita el material.",
    principles: [
      {
        title: "Claridad",
        description:
          "Sin precios ni referencias inventadas. Lo que falta se confirma en la conversación comercial.",
      },
      {
        title: "Precisión",
        description:
          "La solicitud se organiza por línea, familia y cantidad para reducir ambigüedades.",
      },
      {
        title: "Continuidad",
        description:
          "La atención continúa por el canal oficial que la empresa defina y confirme.",
      },
    ],
    categoriesTitle: "Lo que puedes cotizar",
    categoriesBody:
      "Seis líneas de producto y familias asociadas. Explora el catálogo para preparar tu lista.",
    processTitle: "Cómo atendemos una solicitud",
    processBody:
      "Recibimos la necesidad, revisamos la información disponible, preparamos la cotización y coordinamos las condiciones del suministro.",
    note:
      "La información institucional ampliada, el equipo y las certificaciones se publicarán cuando estén documentados y autorizados.",
    ctaTitle: "Prepara tu próxima solicitud.",
    ctaBody:
      "Selecciona las familias que necesitas y revisa la lista antes de compartirla.",
    ctaPrimary: "Ir al catálogo",
    ctaSecondary: "Preparar cotización",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu solicitud.",
    description:
      "Completa los datos, revisa tu mensaje y prepara la solicitud. El envío automático está en configuración y no se simula.",
    formTitle: "Preparar mensaje",
    channelNoticeTitle: "Canal de envío en configuración",
    channelNoticeBody:
      "Este formulario valida tus datos, pero todavía no envía mensajes. Al finalizar, podrás copiar el contenido para compartirlo por el canal oficial cuando esté confirmado.",
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    company: "Empresa",
    companyPlaceholder: "Nombre de tu empresa",
    companyOptional: "opcional",
    email: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    phone: "Teléfono",
    phonePlaceholder: "+57 …",
    phoneOptional: "opcional",
    reason: "Motivo",
    reasonPlaceholder: "Selecciona una opción",
    reasons: [
      { value: "cotizacion", label: "Solicitar cotización" },
      { value: "producto", label: "Consulta sobre un producto" },
      { value: "informacion", label: "Información general" },
      { value: "otro", label: "Otro" },
    ],
    message: "Mensaje",
    messagePlaceholder:
      "Cuéntanos qué materiales necesitas, cantidades y ciudad de entrega…",
    quoteListTitle: "Tu lista de cotización",
    quoteListBody: "ítems seleccionados. Se incluirán en el mensaje.",
    quoteListBodyOne: "ítem seleccionado. Se incluirá en el mensaje.",
    quoteListEmpty: "No tienes productos en la lista.",
    quoteListLink: "Revisar lista",
    submit: "Validar y preparar",
    sending: "Validando…",
    successTitle: "Mensaje enviado",
    successBody: "El canal confirmó el envío de tu mensaje.",
    notConfiguredTitle: "Mensaje no enviado",
    notConfiguredBody:
      "El canal de envío aún no está conectado. Tu mensaje fue validado y permanece en este dispositivo; cópialo para compartirlo cuando la empresa confirme el canal.",
    copy: "Copiar mensaje",
    copied: "Mensaje copiado",
    copyError: "No se pudo copiar. Selecciona el texto manualmente.",
    errorTitle: "No se pudo procesar",
    errorBody: "Revisa tu conexión e inténtalo de nuevo.",
    required: "Este campo es obligatorio.",
    invalidEmail: "Ingresa un correo electrónico válido.",
    tooShort: "El mensaje debe tener al menos 10 caracteres.",
    infoTitle: "Coordenadas",
    infoBody:
      "Dirección, teléfono y correo oficial pendientes de confirmación por la empresa.",
    statusLabel: "Estado",
    statusValue: "Canal en configuración",
    beforeTitle: "Para una cotización más precisa",
    beforeItems: [
      "Línea o familia de interés",
      "Cantidades estimadas",
      "Ciudad de entrega",
      "Referencia o especificación, si la tienes",
    ],
    privacy:
      "Usamos tus datos solo para preparar la solicitud en este navegador. No se envían a servicios externos.",
    quoteItemsIncluded:
      "La lista de cotización se incluirá automáticamente en el mensaje.",
  },
  quote: {
    eyebrow: "Cotización",
    title: "Tu lista de materiales.",
    description:
      "Revisa las familias, ajusta cantidades y completa tus datos. La solicitud se prepara en este dispositivo; no se envía automáticamente.",
    loading: "Cargando tu lista…",
    itemsTitle: "Familias seleccionadas",
    emptyTitle: "Tu lista está vacía.",
    emptyBody:
      "Agrega familias desde el catálogo para preparar una solicitud ordenada.",
    emptyCta: "Explorar catálogo",
    quantity: "Cantidad",
    decrease: "Disminuir cantidad",
    increase: "Aumentar cantidad",
    remove: "Quitar de la lista",
    clear: "Vaciar lista",
    clearConfirm: "¿Vaciar todos los ítems de la lista?",
    confirm: "Sí, vaciar",
    cancel: "Cancelar",
    summaryTitle: "Resumen",
    itemsCount: "Familias",
    itemSingular: "Familia",
    units: "Unidades",
    localNote: "Tu selección se guarda solo en este navegador.",
    formTitle: "Datos de la solicitud",
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    company: "Empresa",
    companyPlaceholder: "Nombre de tu empresa",
    companyOptional: "opcional",
    email: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    phone: "Teléfono",
    phonePlaceholder: "+57 …",
    phoneOptional: "opcional",
    city: "Ciudad de entrega",
    cityPlaceholder: "Ciudad o municipio",
    cityOptional: "opcional",
    notes: "Observaciones",
    notesPlaceholder:
      "Medidas, referencias, especificaciones o cualquier detalle útil para la cotización…",
    prepare: "Preparar solicitud",
    preparedTitle: "Solicitud preparada",
    preparedBody:
      "No se ha enviado. Copia o descarga el texto y compártelo por el canal oficial cuando esté confirmado.",
    copy: "Copiar solicitud",
    download: "Descargar .txt",
    copied: "Solicitud copiada",
    copyError: "No se pudo copiar. Descarga el archivo .txt.",
    reset: "Editar datos",
    channelNote:
      "El envío automático no está activado. No mostramos confirmaciones falsas.",
    required: "Este campo es obligatorio.",
    invalidEmail: "Ingresa un correo electrónico válido.",
    requestHeading: "Solicitud de cotización",
    dateLabel: "Fecha",
    itemsHeading: "Materiales solicitados",
    contactHeading: "Datos de contacto",
    notesHeading: "Observaciones",
    quantityShort: "Cant.",
    priceNote: "Precio y referencia por confirmar.",
    downloadName: "solicitud-cotizacion-gyr.txt",
    noItems: "Sin ítems seleccionados.",
    missingContact: "Completa los datos para preparar la solicitud.",
  },
  meta: {
    homeTitle: "G&R Electric | Material eléctrico y cotización por proyecto",
    homeDescription:
      "Materiales eléctricos para conectar ideas, instalaciones y soluciones. Explora líneas y familias de producto y prepara tu solicitud de cotización.",
    productsTitle: "Catálogo de líneas y familias | G&R Electric",
    productsDescription:
      "Conductores eléctricos, tubería, aislamiento y protección, transformadores, puesta a tierra y herrajería. Catálogo por familias y cotización por solicitud.",
    aboutTitle: "Nosotros | G&R Electric",
    aboutDescription:
      "Distribución de materiales eléctricos con criterio técnico. Conoce las líneas de producto y el proceso de atención por cotización de G&R.",
    contactTitle: "Contacto y cotizaciones | G&R Electric",
    contactDescription:
      "Prepara tu solicitud de cotización de materiales eléctricos. El sitio valida tus datos y te permite copiar el mensaje mientras se confirma el canal oficial.",
    quoteTitle: "Tu lista de cotización | G&R Electric",
    quoteDescription:
      "Revisa las familias seleccionadas, ajusta cantidades y prepara una solicitud de cotización para compartir por el canal oficial.",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    products: "Products",
    about: "About us",
    contact: "Contact",
    quote: "Quote",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to main content",
  },
  header: {
    quoteCta: "Request a quote",
    quoteList: "View quote list",
    quoteCount: "items in the list",
    quoteCountOne: "item in the list",
  },
  hero: {
    eyebrow: "Electrical material · Low and medium voltage",
    titleA: "The energy behind",
    titleAccent: "your projects.",
    description:
      "Electrical materials that connect ideas, installations and solutions.",
    primaryCta: "Explore catalog",
    secondaryCta: "Request a quote",
    imageCaption: "Distribution panel · Reference image",
    imageLabel: "LV / MV",
    rail: ["Catalog by line", "Quote-based service", "Bogotá D.C., Colombia"],
    chip: "Electrical distribution",
  },
  process: {
    eyebrow: "How we work",
    title: "From need to quote, without detours.",
    description:
      "A short process to understand what you need and prepare a clear request.",
    steps: [
      {
        title: "We identify the need",
        description:
          "We review the product line, intended use and the quantities you have defined.",
      },
      {
        title: "We review references",
        description:
          "We compare available names, measurements or references before quoting.",
      },
      {
        title: "We prepare the quote",
        description:
          "We organize the request by line and family to support commercial review.",
      },
      {
        title: "We coordinate supply",
        description:
          "We confirm scope and terms through the official channel defined by the company.",
      },
    ],
    note: "Prices, references and availability are confirmed in the quote.",
  },
  categories: {
    eyebrow: "Catalog",
    title: "Six lines. One technical logic.",
    description:
      "The portfolio is organized by product lines and families. No published prices: every request is reviewed and quoted.",
    explore: "Explore line",
    viewAll: "View all families",
    families: "families",
    lineLabel: "Line",
    imageNote: "Reference image",
  },
  featured: {
    eyebrow: "Selection",
    title: "Families ready for your request.",
    description:
      "Add families to your list, adjust quantities and prepare an organized request. Exact references are confirmed in the quote.",
    add: "Add to quote",
    added: "Added",
    quoteNote: "No published price · Quote on request",
    viewAll: "View full catalog",
    categoryLabel: "Line",
  },
  value: {
    eyebrow: "Commercial judgment",
    title: "Less noise. More precision.",
    description:
      "Buying electrical material requires clarity: what is needed, for which installation and in what quantity. This site is built around that conversation.",
    points: [
      {
        title: "No invented information",
        description:
          "We do not publish references, brands or prices the company has not confirmed.",
      },
      {
        title: "Catalog by families",
        description:
          "A readable structure to find the right line before requesting a quote.",
      },
      {
        title: "Portable request",
        description:
          "Your list is stored in this browser and can be copied or downloaded.",
      },
    ],
    cta: "Prepare my request",
    imageCaption: "Electrical infrastructure · Reference image",
  },
  cta: {
    eyebrow: "Next step",
    title: "Do you have a material list?",
    description:
      "Tell us which lines you need. We will review the request and prepare the quote through the official channels.",
    primary: "Prepare request",
    secondary: "View catalog",
  },
  footer: {
    tagline: "Electrical materials that connect ideas, installations and solutions.",
    company: "Company",
    catalog: "Catalog",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    location: "Bogotá D.C., Colombia",
    channelNote: "Phone and email channels are being confirmed.",
    quoteCta: "Quote list",
    backToTop: "Back to top",
    statusLabel: "Channel status",
    statusValue: "In configuration",
  },
  catalog: {
    eyebrow: "Catalog",
    title: "Product families",
    description:
      "Search by line or family, add what you need and prepare your request. Prices, references and stock are confirmed in the quote.",
    searchLabel: "Search the catalog",
    searchPlaceholder: "E.g. THHN, PVC conduit, grounding…",
    categoryFilter: "Filter by line",
    allCategories: "All lines",
    sortLabel: "Sort",
    sortCategory: "By line",
    sortName: "By name",
    resultsPrefix: "Showing",
    of: "of",
    familySingular: "family",
    familyPlural: "families",
    linePlural: "lines",
    quoteOnRequest: "Quote on request",
    clearFilters: "Clear filters",
    activeFilters: "Active filters",
    noResultsTitle: "No matches found",
    noResultsBody: "Try another word or review all available lines.",
    reset: "View the whole catalog",
    add: "Add",
    added: "Added",
    quoteNote: "Price and reference confirmed when quoting.",
    catalogNote:
      "This catalog organizes lines and families from the available information. It does not publish SKUs, brands, prices or stock.",
    missingDataTitle: "Commercial data pending",
    missingDataBody:
      "References, specifications, brands and prices are not yet confirmed. The commercial team validates them on every quote.",
    generalQuote: "Request a general quote",
  },
  about: {
    eyebrow: "About us",
    title: "Electrical distribution with technical judgment.",
    description:
      "Distribuciones Eléctricas G&R SAS organizes its offering into six electrical material lines and handles quote requests directly.",
    introTitle: "An operation focused on the right material.",
    introBody: [
      "Our work is to connect an installation need with the right electrical material. That is why we organize the portfolio by lines and families, and review every request before quoting.",
      "Published information is limited to what can be verified. Commercial data that is not yet confirmed is handled directly during the quote.",
    ],
    focusTitle: "Our approach",
    focusBody:
      "Precision in the reference, clarity in the quote and direct communication with the person who needs the material.",
    principles: [
      {
        title: "Clarity",
        description:
          "No invented prices or references. What is missing is confirmed in the commercial conversation.",
      },
      {
        title: "Precision",
        description:
          "The request is organized by line, family and quantity to reduce ambiguity.",
      },
      {
        title: "Continuity",
        description:
          "Service continues through the official channel the company defines and confirms.",
      },
    ],
    categoriesTitle: "What you can quote",
    categoriesBody:
      "Six product lines and associated families. Explore the catalog to prepare your list.",
    processTitle: "How we handle a request",
    processBody:
      "We receive the need, review the available information, prepare the quote and coordinate supply terms.",
    note:
      "Expanded corporate information, team and certifications will be published once documented and authorized.",
    ctaTitle: "Prepare your next request.",
    ctaBody:
      "Select the families you need and review the list before sharing it.",
    ctaPrimary: "Go to catalog",
    ctaSecondary: "Prepare quote",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your request.",
    description:
      "Complete your details, review your message and prepare the request. Automatic sending is in configuration and is not simulated.",
    formTitle: "Prepare message",
    channelNoticeTitle: "Sending channel in configuration",
    channelNoticeBody:
      "This form validates your data but does not send messages yet. When finished, you can copy the content and share it through the official channel once confirmed.",
    name: "Name",
    namePlaceholder: "Your full name",
    company: "Company",
    companyPlaceholder: "Your company name",
    companyOptional: "optional",
    email: "Email",
    emailPlaceholder: "name@company.com",
    phone: "Phone",
    phonePlaceholder: "+57 …",
    phoneOptional: "optional",
    reason: "Reason",
    reasonPlaceholder: "Select an option",
    reasons: [
      { value: "cotizacion", label: "Request a quote" },
      { value: "producto", label: "Product question" },
      { value: "informacion", label: "General information" },
      { value: "otro", label: "Other" },
    ],
    message: "Message",
    messagePlaceholder:
      "Tell us which materials you need, quantities and delivery city…",
    quoteListTitle: "Your quote list",
    quoteListBody: "selected items. They will be included in the message.",
    quoteListBodyOne: "selected item. It will be included in the message.",
    quoteListEmpty: "You have no products in the list.",
    quoteListLink: "Review list",
    submit: "Validate and prepare",
    sending: "Validating…",
    successTitle: "Message sent",
    successBody: "The channel confirmed that your message was sent.",
    notConfiguredTitle: "Message not sent",
    notConfiguredBody:
      "The sending channel is not connected yet. Your message was validated and remains on this device; copy it to share when the company confirms the channel.",
    copy: "Copy message",
    copied: "Message copied",
    copyError: "Could not copy. Select the text manually.",
    errorTitle: "Could not process",
    errorBody: "Check your connection and try again.",
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    tooShort: "The message must be at least 10 characters long.",
    infoTitle: "Location",
    infoBody:
      "Official address, phone and email pending confirmation by the company.",
    statusLabel: "Status",
    statusValue: "Channel in configuration",
    beforeTitle: "For a more accurate quote",
    beforeItems: [
      "Line or family of interest",
      "Estimated quantities",
      "Delivery city",
      "Reference or specification, if available",
    ],
    privacy:
      "We use your data only to prepare the request in this browser. It is not sent to external services.",
    quoteItemsIncluded:
      "Your quote list will be included automatically in the message.",
  },
  quote: {
    eyebrow: "Quote",
    title: "Your material list.",
    description:
      "Review families, adjust quantities and complete your details. The request is prepared on this device; it is not sent automatically.",
    loading: "Loading your list…",
    itemsTitle: "Selected families",
    emptyTitle: "Your list is empty.",
    emptyBody: "Add families from the catalog to prepare an organized request.",
    emptyCta: "Explore catalog",
    quantity: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    remove: "Remove from list",
    clear: "Clear list",
    clearConfirm: "Clear all items from the list?",
    confirm: "Yes, clear",
    cancel: "Cancel",
    summaryTitle: "Summary",
    itemsCount: "Families",
    itemSingular: "Family",
    units: "Units",
    localNote: "Your selection is stored only in this browser.",
    formTitle: "Request details",
    name: "Name",
    namePlaceholder: "Your full name",
    company: "Company",
    companyPlaceholder: "Your company name",
    companyOptional: "optional",
    email: "Email",
    emailPlaceholder: "name@company.com",
    phone: "Phone",
    phonePlaceholder: "+57 …",
    phoneOptional: "optional",
    city: "Delivery city",
    cityPlaceholder: "City or municipality",
    cityOptional: "optional",
    notes: "Notes",
    notesPlaceholder:
      "Measurements, references, specifications or any detail useful for the quote…",
    prepare: "Prepare request",
    preparedTitle: "Request prepared",
    preparedBody:
      "It has not been sent. Copy or download the text and share it through the official channel once confirmed.",
    copy: "Copy request",
    download: "Download .txt",
    copied: "Request copied",
    copyError: "Could not copy. Download the .txt file.",
    reset: "Edit details",
    channelNote:
      "Automatic sending is not enabled. We do not show false confirmations.",
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    requestHeading: "Quote request",
    dateLabel: "Date",
    itemsHeading: "Requested materials",
    contactHeading: "Contact details",
    notesHeading: "Notes",
    quantityShort: "Qty.",
    priceNote: "Price and reference to be confirmed.",
    downloadName: "quote-request-gyr.txt",
    noItems: "No items selected.",
    missingContact: "Complete the details to prepare the request.",
  },
  meta: {
    homeTitle: "G&R Electric | Electrical material and project quotes",
    homeDescription:
      "Electrical materials that connect ideas, installations and solutions. Explore product lines and families and prepare your quote request.",
    productsTitle: "Product line and family catalog | G&R Electric",
    productsDescription:
      "Electrical conductors, conduit, insulation and protection, transformers, grounding and hardware. Catalog by families and quote on request.",
    aboutTitle: "About us | G&R Electric",
    aboutDescription:
      "Electrical material distribution with technical judgment. Discover G&R product lines and quote-based service process.",
    contactTitle: "Contact and quotes | G&R Electric",
    contactDescription:
      "Prepare your electrical material quote request. The site validates your data and lets you copy the message while the official channel is confirmed.",
    quoteTitle: "Your quote list | G&R Electric",
    quoteDescription:
      "Review selected families, adjust quantities and prepare a quote request to share through the official channel.",
  },
};

export function getDictionary(lang: Language): Dictionary {
  return lang === "en" ? en : es;
}
