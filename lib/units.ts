export type UnitType = {
  id: string;
  name: string;
  buildingArea: number; // LB in m²
  landArea: number; // LT in m²
  landDimensions: string;
  bedrooms: number;
  bathrooms: number;
  carport?: string;
  coverImageId: string;
  photoIds: string[];
  floorPlanIds: string[];
};

export const FLOOR_PLAN_LABELS = {
  1: 'Lantai Dasar',
  2: 'Lantai 2',
  3: 'Atap',
} as const;

export const units: readonly UnitType[] = [
  {
    id: 'aryasatya',
    name: 'Tipe Aryasatya',
    buildingArea: 68,
    landArea: 55,
    landDimensions: '5x11',
    bedrooms: 3,
    bathrooms: 2,
    coverImageId: 'aryasatya1_vywvat',
    photoIds: [
      'aryasatya1_vywvat',
      'aryasatya2_i01vre',
      'aryasatya3_s9w0og',
      'aryasatya4_hrs761',
      'aryasatya5_h5mptz',
      'aryasatya6_ex3jnf',
      'aryasatya7_vs5gug',
      'aryasatya8_hiuz0s',
      'aryasatya9_qlnpul',
      'aryasatya10_pfshpm',
      'aryasatya11_qbuta1',
    ],
    floorPlanIds: [
      'aryasatya-denah-1_wpcjwe',
      'aryasatya-denah-2_ity1zb',
      'aryasatya-denah-3_myetdu',
    ],
  },
  {
    id: 'adhinata',
    name: 'Tipe Adhinata',
    buildingArea: 83,
    landArea: 66,
    landDimensions: '6x11',
    bedrooms: 3,
    bathrooms: 2,
    carport: '2-car carport',
    coverImageId: 'adhinata1_v85il0',
    photoIds: [
      'adhinata1_v85il0',
      'adhinata2_xxrkeo',
      'adhinata3_rfibdq',
      'adhinata4_f1ghn4',
      'adhinata5_xewy1n',
      'adhinata6_jhyuqq',
      'adhinata7_ptx7s1',
      'adhinata8_i4mbrq',
      'adhinata9_peanbo',
    ],
    floorPlanIds: [
      'adhinata-denah-1_s04ixd',
      'adhinata-denah-2_dtmz96',
      'adhinata-denah-3_wuz9it',
    ],
  },
] as const;
