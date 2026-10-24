/**
 * Rich learning data for "Sambung Huruf & Suku Kata"
 * Categorized by:
 * 1. NOMOR (Angka ditulis kata: SA-TU, DU-A, TI-GA, EM-PAT, LI-MA...)
 * 2. HEWAN (Hewan tangguh & lincah: SI-NGA, HA-RI-MAU, E-LANG, KU-DA...)
 * 3. KENDARAAN (Mobil balap, motor, sepeda, pesawat, roket...)
 * 4. OLAHRAGA (Bola, helm, trofi, piala, lari...)
 */

export interface WordConnectItem {
  id: string;
  word: string;
  category: 'nomor' | 'hewan' | 'kendaraan' | 'olahraga';
  categoryLabel: string;
  letters: string[];
  syllables: string[];
  emoji: string;
  hint: string;
  spellingGuide: string; // e.g. "B-O: BO, L-A: LA. Dibaca: BOLA!"
  color: string;
}

export interface DotPuzzle {
  id: string;
  name: string;
  category: string;
  emoji: string;
  dots: { letter: string; x: number; y: number }[];
  rewardMessage: string;
}

export const CATEGORIES_LIST = [
  { id: 'all', label: 'Semua Kata', icon: '🌟' },
  { id: 'nomor', label: 'Nomor (Angka)', icon: '🔢' },
  { id: 'hewan', label: 'Hewan', icon: '🦁' },
  { id: 'kendaraan', label: 'Kendaraan', icon: '🏎️' },
  { id: 'olahraga', label: 'Olahraga', icon: '⚽' }
];

export const WORDS_DATA: WordConnectItem[] = [
  // --- KATEGORI 1: NOMOR / ANGKA ---
  {
    id: 'num-satu',
    word: 'SATU',
    category: 'nomor',
    categoryLabel: 'Nomor 1',
    letters: ['S', 'A', 'T', 'U'],
    syllables: ['SA', 'TU'],
    emoji: '🥇',
    hint: 'Angka 1: Juara nomor satu di podium!',
    spellingGuide: 'S-A: SA, T-U: TU. Dibaca: SA-TU (1)!',
    color: '#F59E0B'
  },
  {
    id: 'num-dua',
    word: 'DUA',
    category: 'nomor',
    categoryLabel: 'Nomor 2',
    letters: ['D', 'U', 'A'],
    syllables: ['DU', 'A'],
    emoji: '👟',
    hint: 'Angka 2: Sepasang sepatu lari kanan dan kiri!',
    spellingGuide: 'D-U: DU, A. Dibaca: DU-A (2)!',
    color: '#3B82F6'
  },
  {
    id: 'num-tiga',
    word: 'TIGA',
    category: 'nomor',
    categoryLabel: 'Nomor 3',
    letters: ['T', 'I', 'G', 'A'],
    syllables: ['TI', 'GA'],
    emoji: '🏀',
    hint: 'Angka 3: Tiga bola basket siap masuk ring!',
    spellingGuide: 'T-I: TI, G-A: GA. Dibaca: TI-GA (3)!',
    color: '#EA580C'
  },
  {
    id: 'num-empat',
    word: 'EMPAT',
    category: 'nomor',
    categoryLabel: 'Nomor 4',
    letters: ['E', 'M', 'P', 'A', 'T'],
    syllables: ['EM', 'PAT'],
    emoji: '🏎️',
    hint: 'Angka 4: Empat roda mobil balap yang kuat!',
    spellingGuide: 'E-M: EM, P-A-T: PAT. Dibaca: EM-PAT (4)!',
    color: '#EF4444'
  },
  {
    id: 'num-lima',
    word: 'LIMA',
    category: 'nomor',
    categoryLabel: 'Nomor 5',
    letters: ['L', 'I', 'M', 'A'],
    syllables: ['LI', 'MA'],
    emoji: '⭐',
    hint: 'Angka 5: Lima bintang prestasi gemerlap!',
    spellingGuide: 'L-I: LI, M-A: MA. Dibaca: LI-MA (5)!',
    color: '#EAB308'
  },
  {
    id: 'num-enam',
    word: 'ENAM',
    category: 'nomor',
    categoryLabel: 'Nomor 6',
    letters: ['E', 'N', 'A', 'M'],
    syllables: ['E', 'NAM'],
    emoji: '🪖',
    hint: 'Angka 6: Enam helm pelindung atlet!',
    spellingGuide: 'E: E, N-A-M: NAM. Dibaca: E-NAM (6)!',
    color: '#06B6D4'
  },
  {
    id: 'num-tujuh',
    word: 'TUJUH',
    category: 'nomor',
    categoryLabel: 'Nomor 7',
    letters: ['T', 'U', 'J', 'U', 'H'],
    syllables: ['TU', 'JUH'],
    emoji: '🥤',
    hint: 'Angka 7: Nomor jersey sang juara!',
    spellingGuide: 'T-U: TU, J-U-H: JUH. Dibaca: TU-JUH (7)!',
    color: '#10B981'
  },
  {
    id: 'num-delapan',
    word: 'DELAPAN',
    category: 'nomor',
    categoryLabel: 'Nomor 8',
    letters: ['D', 'E', 'L', 'A', 'P', 'A', 'N'],
    syllables: ['DE', 'LA', 'PAN'],
    emoji: '🛹',
    hint: 'Angka 8: Delapan roda skateboard berputar!',
    spellingGuide: 'D-E: DE, L-A: LA, P-A-N: PAN. Dibaca: DE-LA-PAN (8)!',
    color: '#8B5CF6'
  },
  {
    id: 'num-sembilan',
    word: 'SEMBILAN',
    category: 'nomor',
    categoryLabel: 'Nomor 9',
    letters: ['S', 'E', 'M', 'B', 'I', 'L', 'A', 'N'],
    syllables: ['SEM', 'BI', 'LAN'],
    emoji: '📢',
    hint: 'Angka 9: Sembilan peluit wasit berbunyi!',
    spellingGuide: 'S-E-M: SEM, B-I: BI, L-A-N: LAN. Dibaca: SEM-BI-LAN (9)!',
    color: '#F43F5E'
  },
  {
    id: 'num-sepuluh',
    word: 'SEPULUH',
    category: 'nomor',
    categoryLabel: 'Nomor 10',
    letters: ['S', 'E', 'P', 'U', 'L', 'U', 'H'],
    syllables: ['SE', 'PU', 'LUH'],
    emoji: '🏆',
    hint: 'Angka 10: Sepuluh trofi kebanggaan!',
    spellingGuide: 'S-E: SE, P-U: PU, L-U-H: LUH. Dibaca: SE-PU-LUH (10)!',
    color: '#EAB308'
  },

  // --- KATEGORI 2: HEWAN ---
  {
    id: 'hew-singa',
    word: 'SINGA',
    category: 'hewan',
    categoryLabel: 'Hewan Rimba',
    letters: ['S', 'I', 'N', 'G', 'A'],
    syllables: ['SI', 'NGA'],
    emoji: '🦁',
    hint: 'Raja rimba yang gagah dan pemberani!',
    spellingGuide: 'S-I: SI, N-G-A: NGA. Dibaca: SI-NGA (Singa)!',
    color: '#F59E0B'
  },
  {
    id: 'hew-kuda',
    word: 'KUDA',
    category: 'hewan',
    categoryLabel: 'Hewan Pelari',
    letters: ['K', 'U', 'D', 'A'],
    syllables: ['KU', 'DA'],
    emoji: '🐎',
    hint: 'Berlari kencang dengan langkah perkasa!',
    spellingGuide: 'K-U: KU, D-A: DA. Dibaca: KU-DA (Kuda)!',
    color: '#92400E'
  },
  {
    id: 'hew-elang',
    word: 'ELANG',
    category: 'hewan',
    categoryLabel: 'Burung Tangguh',
    letters: ['E', 'L', 'A', 'N', 'G'],
    syllables: ['E', 'LANG'],
    emoji: '🦅',
    hint: 'Terbang tinggi di langit seperti juara!',
    spellingGuide: 'E: E, L-A-N-G: LANG. Dibaca: E-LANG (Elang)!',
    color: '#0284C7'
  },
  {
    id: 'hew-gajah',
    word: 'GAJAH',
    category: 'hewan',
    categoryLabel: 'Hewan Besar',
    letters: ['G', 'A', 'J', 'A', 'H'],
    syllables: ['GA', 'JAH'],
    emoji: '🐘',
    hint: 'Hewan bertubuh besar dengan belalai panjang!',
    spellingGuide: 'G-A: GA, J-A-H: JAH. Dibaca: GA-JAH (Gajah)!',
    color: '#64748B'
  },
  {
    id: 'hew-ikan',
    word: 'IKAN',
    category: 'hewan',
    categoryLabel: 'Hewan Air',
    letters: ['I', 'K', 'A', 'N'],
    syllables: ['I', 'KAN'],
    emoji: '🐟',
    hint: 'Berenang lincah dan gesit di air jernih!',
    spellingGuide: 'I: I, K-A-N: KAN. Dibaca: I-KAN (Ikan)!',
    color: '#06B6D4'
  },
  {
    id: 'hew-kucing',
    word: 'KUCING',
    category: 'hewan',
    categoryLabel: 'Hewan Lucu',
    letters: ['K', 'U', 'C', 'I', 'N', 'G'],
    syllables: ['KU', 'CING'],
    emoji: '🐱',
    hint: 'Lincah melompat dan mengeong riang!',
    spellingGuide: 'K-U: KU, C-I-N-G: CING. Dibaca: KU-CING (Kucing)!',
    color: '#F97316'
  },
  {
    id: 'hew-zebra',
    word: 'ZEBRA',
    category: 'hewan',
    categoryLabel: 'Hewan Belang',
    letters: ['Z', 'E', 'B', 'R', 'A'],
    syllables: ['ZE', 'BRA'],
    emoji: '🦓',
    hint: 'Tubuhnya bermotif garis balap hitam putih!',
    spellingGuide: 'Z-E: ZE, B-R-A: BRA. Dibaca: ZE-BRA (Zebra)!',
    color: '#1E293B'
  },
  {
    id: 'hew-harimau',
    word: 'HARIMAU',
    category: 'hewan',
    categoryLabel: 'Hewan Cepat',
    letters: ['H', 'A', 'R', 'I', 'M', 'A', 'U'],
    syllables: ['HA', 'RI', 'MAU'],
    emoji: '🐯',
    hint: 'Kucing besar berbelang yang berlari cepat!',
    spellingGuide: 'H-A: HA, R-I: RI, M-A-U: MAU. Dibaca: HA-RI-MAU!',
    color: '#EA580C'
  },

  // --- KATEGORI 3: KENDARAAN ---
  {
    id: 'ken-mobil',
    word: 'MOBIL',
    category: 'kendaraan',
    categoryLabel: 'Mobil Balap',
    letters: ['M', 'O', 'B', 'I', 'L'],
    syllables: ['MO', 'BIL'],
    emoji: '🏎️',
    hint: 'Mobil balap turbo melesat kencang di sirkuit!',
    spellingGuide: 'M-O: MO, B-I-L: BIL. Dibaca: MO-BIL (Mobil)!',
    color: '#DC2626'
  },
  {
    id: 'ken-motor',
    word: 'MOTOR',
    category: 'kendaraan',
    categoryLabel: 'Sepeda Motor',
    letters: ['M', 'O', 'T', 'O', 'R'],
    syllables: ['MO', 'TOR'],
    emoji: '🏍️',
    hint: 'Kendaraan roda dua sporty yang gesit di jalan!',
    spellingGuide: 'M-O: MO, T-O-R: TOR. Dibaca: MO-TOR (Motor)!',
    color: '#2563EB'
  },
  {
    id: 'ken-sepeda',
    word: 'SEPEDA',
    category: 'kendaraan',
    categoryLabel: 'Sepeda Gowes',
    letters: ['S', 'E', 'P', 'E', 'D', 'A'],
    syllables: ['SE', 'PE', 'DA'],
    emoji: '🚲',
    hint: 'Gowes pedal sepeda BMX sehat bertenaga!',
    spellingGuide: 'S-E: SE, P-E: PE, D-A: DA. Dibaca: SE-PE-DA (Sepeda)!',
    color: '#10B981'
  },
  {
    id: 'ken-pesawat',
    word: 'PESAWAT',
    category: 'kendaraan',
    categoryLabel: 'Pesawat Terbang',
    letters: ['P', 'E', 'S', 'A', 'W', 'A', 'T'],
    syllables: ['PE', 'SA', 'WAT'],
    emoji: '✈️',
    hint: 'Terbang tinggi menembus awan di angkasa!',
    spellingGuide: 'P-E: PE, S-A: SA, W-A-T: WAT. Dibaca: PE-SA-WAT!',
    color: '#0284C7'
  },
  {
    id: 'ken-kereta',
    word: 'KERETA',
    category: 'kendaraan',
    categoryLabel: 'Kereta Kilat',
    letters: ['K', 'E', 'R', 'E', 'T', 'A'],
    syllables: ['KE', 'RE', 'TA'],
    emoji: '🚆',
    hint: 'Maju di atas rel dengan gerbong panjang!',
    spellingGuide: 'K-E: KE, R-E: RE, T-A: TA. Dibaca: KE-RE-TA (Kereta)!',
    color: '#7C3AED'
  },
  {
    id: 'ken-kapal',
    word: 'KAPAL',
    category: 'kendaraan',
    categoryLabel: 'Kapal Laut',
    letters: ['K', 'A', 'P', 'A', 'L'],
    syllables: ['KA', 'PAL'],
    emoji: '🚢',
    hint: 'Berlayar gagah melintasi ombak samudra luas!',
    spellingGuide: 'K-A: KA, P-A-L: PAL. Dibaca: KA-PAL (Kapal)!',
    color: '#0369A1'
  },
  {
    id: 'ken-truk',
    word: 'TRUK',
    category: 'kendaraan',
    categoryLabel: 'Truk Tangguh',
    letters: ['T', 'R', 'U', 'K'],
    syllables: ['TRUK'],
    emoji: '🚚',
    hint: 'Truk pengangkut dengan mesin bertenaga besar!',
    spellingGuide: 'T-R-U-K: TRUK. Dibaca: TRUK (Truk)!',
    color: '#EA580C'
  },
  {
    id: 'ken-bus',
    word: 'BUS',
    category: 'kendaraan',
    categoryLabel: 'Bus Atlet',
    letters: ['B', 'U', 'S'],
    syllables: ['BUS'],
    emoji: '🚌',
    hint: 'Membawa seluruh tim juara menuju stadion!',
    spellingGuide: 'B-U-S: BUS. Dibaca: BUS (Bus)!',
    color: '#FACC15'
  },
  {
    id: 'ken-roket',
    word: 'ROKET',
    category: 'kendaraan',
    categoryLabel: 'Roket Angkasa',
    letters: ['R', 'O', 'K', 'E', 'T'],
    syllables: ['RO', 'KET'],
    emoji: '🚀',
    hint: 'Melesat super cepat menuju bintang di luar angkasa!',
    spellingGuide: 'R-O: RO, K-E-T: KET. Dibaca: RO-KET (Roket)!',
    color: '#E11D48'
  },

  // --- KATEGORI 4: OLAHRAGA ---
  {
    id: 'ola-bola',
    word: 'BOLA',
    category: 'olahraga',
    categoryLabel: 'Sepak Bola',
    letters: ['B', 'O', 'L', 'A'],
    syllables: ['BO', 'LA'],
    emoji: '⚽',
    hint: 'Ditendang ke gawang untuk cetak gol!',
    spellingGuide: 'B-O: BO, L-A: LA. Dibaca: BO-LA (Bola)!',
    color: '#2563EB'
  },
  {
    id: 'ola-helm',
    word: 'HELM',
    category: 'olahraga',
    categoryLabel: 'Peralatan Balap',
    letters: ['H', 'E', 'L', 'M'],
    syllables: ['HEL', 'M'],
    emoji: '🪖',
    hint: 'Pelindung kepala pembalap dan pesepeda aman!',
    spellingGuide: 'H-E-L: HEL, M: M. Dibaca: HELM (Helm)!',
    color: '#06B6D4'
  },
  {
    id: 'ola-trofi',
    word: 'TROFI',
    category: 'olahraga',
    categoryLabel: 'Piala Juara',
    letters: ['T', 'R', 'O', 'F', 'I'],
    syllables: ['TRO', 'FI'],
    emoji: '🏆',
    hint: 'Piala emas lambang kemenangan di podium!',
    spellingGuide: 'T-R-O: TRO, F-I: FI. Dibaca: TRO-FI (Trofi)!',
    color: '#F59E0B'
  },
  {
    id: 'ola-lari',
    word: 'LARI',
    category: 'olahraga',
    categoryLabel: 'Lari Cepat',
    letters: ['L', 'A', 'R', 'I'],
    syllables: ['LA', 'RI'],
    emoji: '👟',
    hint: 'Lari melesat cepat ke garis finish!',
    spellingGuide: 'L-A: LA, R-I: RI. Dibaca: LA-RI (Lari)!',
    color: '#EF4444'
  }
];

export const DOT_PUZZLES: DotPuzzle[] = [
  {
    id: 'dot-car',
    name: 'Mobil Balap Turbo',
    category: 'Kendaraan',
    emoji: '🏎️',
    rewardMessage: 'Horeee! Garis huruf tersambung membentuk Mobil Balap!',
    dots: [
      { letter: 'A', x: 20, y: 75 },
      { letter: 'B', x: 20, y: 50 },
      { letter: 'C', x: 38, y: 50 },
      { letter: 'D', x: 50, y: 25 },
      { letter: 'E', x: 70, y: 25 },
      { letter: 'F', x: 80, y: 50 },
      { letter: 'G', x: 92, y: 55 },
      { letter: 'H', x: 92, y: 75 },
      { letter: 'I', x: 75, y: 75 },
      { letter: 'J', x: 35, y: 75 }
    ]
  },
  {
    id: 'dot-trophy',
    name: 'Piala Juara Emas',
    category: 'Penghargaan',
    emoji: '🏆',
    rewardMessage: 'Luar biasa! Huruf tersambung membentuk Piala Juara!',
    dots: [
      { letter: 'A', x: 30, y: 20 },
      { letter: 'B', x: 70, y: 20 },
      { letter: 'C', x: 65, y: 55 },
      { letter: 'D', x: 55, y: 65 },
      { letter: 'E', x: 55, y: 80 },
      { letter: 'F', x: 70, y: 85 },
      { letter: 'G', x: 30, y: 85 },
      { letter: 'H', x: 45, y: 80 },
      { letter: 'I', x: 45, y: 65 },
      { letter: 'J', x: 35, y: 55 }
    ]
  },
  {
    id: 'dot-lion',
    name: 'Singa Raja Rimba',
    category: 'Hewan',
    emoji: '🦁',
    rewardMessage: 'Hebat! Kamu berhasil menyambung Singa Pemberani!',
    dots: [
      { letter: 'A', x: 50, y: 20 },
      { letter: 'B', x: 75, y: 25 },
      { letter: 'C', x: 85, y: 50 },
      { letter: 'D', x: 75, y: 75 },
      { letter: 'E', x: 50, y: 85 },
      { letter: 'F', x: 25, y: 75 },
      { letter: 'G', x: 15, y: 50 },
      { letter: 'H', x: 25, y: 25 }
    ]
  }
];
