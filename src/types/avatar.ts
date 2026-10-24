export interface AvatarConfig {
  headwear: 'cap-forward' | 'cap-backward' | 'helmet' | 'headband' | 'spiky-hair' | 'curly-hair';
  headwearColor: string;
  hairColor: string;
  skinTone: string;
  jerseyColor: string;
  jerseyPattern: 'stripes' | 'solid' | 'lightning';
  jerseyNumber: number;
  shortsColor: string;
  shoesColor: string;
  accessory: 'none' | 'gold-medal' | 'referee-whistle' | 'cool-sunglasses' | 'wristband';
  expression: 'happy' | 'smile' | 'wink' | 'excited';
}

export const DEFAULT_AVATAR: AvatarConfig = {
  headwear: 'cap-backward',
  headwearColor: '#1D4ED8', // Electric Blue
  hairColor: '#451A03',     // Dark Brown
  skinTone: '#FCD34D',      // Warm golden/light peach
  jerseyColor: '#2563EB',   // Sport Blue
  jerseyPattern: 'stripes',
  jerseyNumber: 7,
  shortsColor: '#1E293B',   // Dark Navy
  shoesColor: '#EF4444',    // Turbo Red sneakers
  accessory: 'gold-medal',
  expression: 'happy'
};
