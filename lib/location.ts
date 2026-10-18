import { LucideIcon, Car, TrainFront, Store, Hospital, School, ShoppingBasket } from 'lucide-react';

export type LocationItem = {
  id: string;
  label: string;
  minutes: number;
  icon: LucideIcon;
};

export const locations: readonly LocationItem[] = [
  {
    id: 'tol-bsd-bintaro',
    label: 'Tol BSD – Bintaro',
    minutes: 10,
    icon: Car,
  },
  {
    id: 'stasiun-rawa-buntu',
    label: 'Stasiun Rawa Buntu',
    minutes: 10,
    icon: TrainFront,
  },
  {
    id: 'the-breeze',
    label: 'The Breeze',
    minutes: 15,
    icon: Store,
  },
  {
    id: 'eka-hospital',
    label: 'Eka Hospital',
    minutes: 10,
    icon: Hospital,
  },
  {
    id: 'sekolah-cikal',
    label: 'Sekolah Cikal',
    minutes: 10,
    icon: School,
  },
  {
    id: 'pasar-modern-bsd',
    label: 'Pasar Modern BSD',
    minutes: 15,
    icon: ShoppingBasket,
  },
] as const;
