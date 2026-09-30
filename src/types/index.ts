export interface Contractor {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  badges: ('featured' | 'popular')[];
  image?: string;
  logo?: string;
  logoOnDark?: boolean;
  categories: string[];
  services?: string[];
  location?: string;
  lat?: number | null;
  lng?: number | null;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  image?: string;
  description?: string;
  owner?: string;
  contractor?: string;
  generalContractor?: string;
  ironworkerHours?: number;
  localUnion?: string;
  sqft?: string;
  award?: 'winner' | 'submitted' | null;
  challenges?: string;
  innovations?: string;
  safety?: string;
  scope?: string;
  gallery?: string[];
  featured?: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  slug: string;
  location: string;
  categories: string[];
  image?: string;
  logo?: string;
  logoOnDark?: boolean;
  description?: string;
  website?: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  projectCount: number;
  image?: string;
}

export interface LocationCardType {
  id: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}
