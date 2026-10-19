export const site = {
  brand: 'The Brawijaya',
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER,
  priceFrom: 'Rp970 Juta',
  bookingFee: 'Rp10 juta all-in',
  installmentFrom: 'Rp6 jutaan/bulan',
  instagram: 'thebrawijaya.official',
  description: 'Cluster 2 lantai bergaya klasik modern di Serpong, Tangerang Selatan',
  location: 'Serpong, Tangerang Selatan',
  marketing: {
    name: 'Yulia',
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  enabled: boolean;
};

export const navItems: readonly NavItem[] = [
  { label: 'Beranda', href: '#beranda', enabled: true },
  { label: 'Aryasatya', href: '#aryasatya', enabled: true },
  { label: 'Adhinata', href: '#adhinata', enabled: true },
  { label: 'Keunggulan', href: '#keunggulan', enabled: true },
  { label: 'Kontak', href: '#kontak', enabled: false },
] as const;
