export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'upvc' | 'cold-storage' | 'polycarbonate' | 'specialty';
  tagline: string;
  description: string;
  image: string;
  thickness: string;
  standardWidth: string;
  thermalRating: string;
  fireRating: string;
  spanCapacity: string;
  features: string[];
  applications: string[];
  density?: string;
  colorOptions: string[];
  featured?: boolean;
}

export interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  code: string;
}

export interface Certificate {
  id: string;
  code: string;
  title: string;
  issuer: string;
  standard: string;
  issueDate: string;
  validThrough: string;
  description: string;
  sealColor: string;
  badge: string;
  testedParameters: { label: string; result: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
  projectScale: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface RFQFormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  panelType: string;
  thickness: string;
  estimatedArea: string;
  temperatureRequirement: string;
  projectLocation: string;
  notes: string;
}
