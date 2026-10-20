export type CategorySlug =
  | "conductores"
  | "tuberia"
  | "aislamiento"
  | "transformadores"
  | "tierra"
  | "herrajeria";

export type IconName =
  | "cable"
  | "pipe"
  | "shield"
  | "transformer"
  | "ground"
  | "hardware";

export interface ProductFamily {
  /** Identificador interno estable para la lista de cotización. */
  id: string;
  slug: string;
  category: CategorySlug;
  nameEs: string;
  nameEn: string;
  /** Campos opcionales listos para una futura fuente CMS/DB. */
  image?: string;
  brand?: string;
  reference?: string;
  specifications?: { labelEs: string; labelEn: string; value: string }[];
  /** Solo debe poblarse con un precio comercial confirmado. */
  price?: { amount: number; currency: "COP"; noteEs?: string; noteEn?: string };
  /** Solo debe poblarse con disponibilidad proveniente de una fuente real. */
  availability?: "in-stock" | "on-request";
  featured?: boolean;
}

export interface CatalogCategory {
  slug: CategorySlug;
  code: string;
  icon: IconName;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  image: string;
  imageAltEs: string;
  imageAltEn: string;
}

/**
 * Líneas y familias tomadas del contenido verificable del proyecto original
 * (index.html + pages/productos.html). No incluye SKUs, marcas, referencias,
 * precios, especificaciones ni existencias: esos datos se confirman al cotizar.
 */
export const catalogCategories: CatalogCategory[] = [
  {
    slug: "conductores",
    code: "L-01",
    icon: "cable",
    nameEs: "Conductores eléctricos",
    nameEn: "Electrical conductors",
    descriptionEs:
      "Cables y conductores para instalaciones eléctricas residenciales, comerciales e industriales.",
    descriptionEn:
      "Cables and conductors for residential, commercial and industrial electrical installations.",
    image: "/images/catalog/conductores.jpg",
    imageAltEs: "Detalle de cableado y conexiones, imagen de referencia.",
    imageAltEn: "Close-up of wiring and connections, reference image.",
  },
  {
    slug: "tuberia",
    code: "L-02",
    icon: "pipe",
    nameEs: "Tubería",
    nameEn: "Conduit",
    descriptionEs:
      "Tuberías conduit y accesorios para protección y canalización de cables.",
    descriptionEn:
      "Conduit pipes and fittings for cable protection and routing.",
    image: "/images/catalog/tuberia.jpg",
    imageAltEs: "Tubería PVC apilada, imagen de referencia.",
    imageAltEn: "Stacked PVC conduit, reference image.",
  },
  {
    slug: "aislamiento",
    code: "L-03",
    icon: "shield",
    nameEs: "Aislamiento y protección",
    nameEn: "Insulation and protection",
    descriptionEs:
      "Materiales aislantes y protectores para instalaciones eléctricas seguras.",
    descriptionEn:
      "Insulating and protective materials for safe electrical installations.",
    image: "/images/catalog/proteccion.jpg",
    imageAltEs:
      "Interruptores de protección sobre riel, imagen de referencia.",
    imageAltEn: "Protective breakers on a DIN rail, reference image.",
  },
  {
    slug: "transformadores",
    code: "L-04",
    icon: "transformer",
    nameEs: "Transformadores",
    nameEn: "Transformers",
    descriptionEs:
      "Transformadores de distribución y potencia para diferentes aplicaciones.",
    descriptionEn:
      "Distribution and power transformers for different applications.",
    image: "/images/catalog/transformadores.jpg",
    imageAltEs: "Transformador de distribución, imagen de referencia.",
    imageAltEn: "Distribution transformer, reference image.",
  },
  {
    slug: "tierra",
    code: "L-05",
    icon: "ground",
    nameEs: "Puesta a tierra",
    nameEn: "Grounding",
    descriptionEs:
      "Sistemas completos de puesta a tierra para protección eléctrica.",
    descriptionEn:
      "Complete grounding systems for electrical protection.",
    image: "/images/catalog/tierra.jpg",
    imageAltEs: "Rollo de conductor de cobre, imagen de referencia.",
    imageAltEn: "Coil of copper conductor, reference image.",
  },
  {
    slug: "herrajeria",
    code: "L-06",
    icon: "hardware",
    nameEs: "Herrajería",
    nameEn: "Hardware",
    descriptionEs:
      "Herrajes y accesorios para líneas eléctricas aéreas y subterráneas.",
    descriptionEn:
      "Fittings and accessories for overhead and underground power lines.",
    image: "/images/catalog/herrajeria.jpg",
    imageAltEs: "Tuercas y herrajes metálicos, imagen de referencia.",
    imageAltEn: "Metal nuts and hardware, reference image.",
  },
];

export const productFamilies: ProductFamily[] = [
  {
    id: "conductores-thhn-thwn",
    slug: "cables-thhn-thwn",
    category: "conductores",
    nameEs: "Cables THHN/THWN",
    nameEn: "THHN/THWN cables",
    featured: true,
  },
  {
    id: "conductores-aluminio",
    slug: "cables-de-aluminio",
    category: "conductores",
    nameEs: "Cables de aluminio",
    nameEn: "Aluminum cables",
  },
  {
    id: "conductores-control",
    slug: "cables-de-control",
    category: "conductores",
    nameEs: "Cables de control",
    nameEn: "Control cables",
  },
  {
    id: "conductores-coaxiales",
    slug: "cables-coaxiales",
    category: "conductores",
    nameEs: "Cables coaxiales",
    nameEn: "Coaxial cables",
  },
  {
    id: "tuberia-pvc",
    slug: "tuberia-pvc",
    category: "tuberia",
    nameEs: "Tubería PVC",
    nameEn: "PVC conduit",
    featured: true,
  },
  {
    id: "tuberia-emt",
    slug: "tuberia-metalica-emt",
    category: "tuberia",
    nameEs: "Tubería metálica EMT",
    nameEn: "EMT metallic conduit",
  },
  {
    id: "tuberia-cajas-registro",
    slug: "cajas-de-registro",
    category: "tuberia",
    nameEs: "Cajas de registro",
    nameEn: "Junction boxes",
  },
  {
    id: "tuberia-accesorios",
    slug: "accesorios-de-conexion",
    category: "tuberia",
    nameEs: "Accesorios de conexión",
    nameEn: "Connection fittings",
  },
  {
    id: "aislamiento-cinta",
    slug: "cinta-aislante",
    category: "aislamiento",
    nameEs: "Cinta aislante",
    nameEn: "Insulating tape",
    featured: true,
  },
  {
    id: "aislamiento-mangas",
    slug: "mangas-termocontraibles",
    category: "aislamiento",
    nameEs: "Mangas termocontraíbles",
    nameEn: "Heat-shrink sleeves",
  },
  {
    id: "aislamiento-conectores",
    slug: "conectores-aislados",
    category: "aislamiento",
    nameEs: "Conectores aislados",
    nameEn: "Insulated connectors",
  },
  {
    id: "aislamiento-guardacables",
    slug: "guardacables",
    category: "aislamiento",
    nameEs: "Guardacables",
    nameEn: "Cable guards",
  },
  {
    id: "transformadores-monofasicos",
    slug: "transformadores-monofasicos",
    category: "transformadores",
    nameEs: "Transformadores monofásicos",
    nameEn: "Single-phase transformers",
    featured: true,
  },
  {
    id: "transformadores-trifasicos",
    slug: "transformadores-trifasicos",
    category: "transformadores",
    nameEs: "Transformadores trifásicos",
    nameEn: "Three-phase transformers",
  },
  {
    id: "transformadores-secos",
    slug: "transformadores-secos",
    category: "transformadores",
    nameEs: "Transformadores secos",
    nameEn: "Dry-type transformers",
  },
  {
    id: "transformadores-accesorios",
    slug: "accesorios-para-transformadores",
    category: "transformadores",
    nameEs: "Accesorios para transformadores",
    nameEn: "Transformer accessories",
  },
  {
    id: "tierra-varillas",
    slug: "varillas-de-cobre",
    category: "tierra",
    nameEs: "Varillas de cobre",
    nameEn: "Copper rods",
    featured: true,
  },
  {
    id: "tierra-cables",
    slug: "cables-de-tierra",
    category: "tierra",
    nameEs: "Cables de tierra",
    nameEn: "Ground cables",
  },
  {
    id: "tierra-conectores",
    slug: "conectores-de-tierra",
    category: "tierra",
    nameEs: "Conectores de tierra",
    nameEn: "Ground connectors",
  },
  {
    id: "tierra-medidores",
    slug: "medidores-de-tierra",
    category: "tierra",
    nameEs: "Medidores de tierra",
    nameEn: "Ground meters",
  },
  {
    id: "herrajeria-aisladores",
    slug: "aisladores-en-suspension",
    category: "herrajeria",
    nameEs: "Aisladores en suspensión",
    nameEn: "Suspension insulators",
  },
  {
    id: "herrajeria-anclaje",
    slug: "herrajes-de-anclaje",
    category: "herrajeria",
    nameEs: "Herrajes de anclaje",
    nameEn: "Anchoring hardware",
  },
  {
    id: "herrajeria-compresion",
    slug: "conectores-de-compresion",
    category: "herrajeria",
    nameEs: "Conectores de compresión",
    nameEn: "Compression connectors",
  },
  {
    id: "herrajeria-accesorios",
    slug: "accesorios-varios",
    category: "herrajeria",
    nameEs: "Accesorios varios",
    nameEn: "Miscellaneous accessories",
  },
];

const categoryBySlug = new Map(
  catalogCategories.map((category) => [category.slug, category]),
);

const familyById = new Map(productFamilies.map((family) => [family.id, family]));

export function getCategory(
  slug: CategorySlug | string,
): CatalogCategory | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}

export function getFamily(id: string): ProductFamily | undefined {
  return familyById.get(id);
}

export function getFamiliesByCategory(slug: CategorySlug): ProductFamily[] {
  return productFamilies.filter((family) => family.category === slug);
}

export function getCategoryName(
  category: CatalogCategory,
  lang: "es" | "en",
): string {
  return lang === "en" ? category.nameEn : category.nameEs;
}

export function getFamilyName(family: ProductFamily, lang: "es" | "en"): string {
  return lang === "en" ? family.nameEn : family.nameEs;
}

export function countFamilies(slug: CategorySlug): number {
  return getFamiliesByCategory(slug).length;
}

export const featuredFamilies = productFamilies.filter(
  (family) => family.featured,
);
