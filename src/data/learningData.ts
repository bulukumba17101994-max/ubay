/**
 * Learning data for Kindergarteners (Huruf A-Z, Angka 1-10, Warna Dasar)
 * Sporty boy friendly theme: Racing, Soccer, Basketball, Champion, Energy!
 */

export interface LetterItem {
  id: string;
  char: string;
  lower: string;
  word: string;
  sentence: string;
  sportTag: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface NumberItem {
  number: number;
  word: string;
  objectName: string;
  singular: string;
  emoji: string;
  color: string;
  description: string;
  items: string[];
}

export interface ColorItem {
  id: string;
  name: string;
  teamName: string;
  hex: string;
  contrastText: string;
  exampleItems: { name: string; emoji: string }[];
  funFact: string;
}

export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  requiredStars: number;
  sportCategory: string;
  flavorText: string;
}

export const LETTERS_DATA: LetterItem[] = [
  {
    id: 'a',
    char: 'A',
    lower: 'a',
    word: 'Atlet',
    sentence: 'A untuk Atlet! Lari cepat seperti kilat menuju garis finish!',
    sportTag: 'Lari Cepat',
    emoji: '🏃‍♂️',
    color: '#EF4444',
    bgLight: '#FEF2F2',
    borderColor: '#FCA5A5'
  },
  {
    id: 'b',
    char: 'B',
    lower: 'b',
    word: 'Bola',
    sentence: 'B untuk Bola! Ayo tendang bolanya kencang masuk gawang! Gool!',
    sportTag: 'Sepak Bola',
    emoji: '⚽',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    borderColor: '#93C5FD'
  },
  {
    id: 'c',
    char: 'C',
    lower: 'c',
    word: 'Cepat',
    sentence: 'C untuk Cepat! Mobil balap turbo melesat di tikungan sirkuit!',
    sportTag: 'Balap Mobil',
    emoji: '🏎️',
    color: '#F97316',
    bgLight: '#FFF7ED',
    borderColor: '#FDBA74'
  },
  {
    id: 'd',
    char: 'D',
    lower: 'd',
    word: 'Dribel',
    sentence: 'D untuk Dribel! Pantulkan bola basket melewati kawan dan lawan!',
    sportTag: 'Bola Basket',
    emoji: '🏀',
    color: '#EA580C',
    bgLight: '#FFF7ED',
    borderColor: '#FDBA74'
  },
  {
    id: 'e',
    char: 'E',
    lower: 'e',
    word: 'Elang',
    sentence: 'E untuk Elang! Terbang tinggi dan gagah seperti juara sejati!',
    sportTag: 'Garuda Muda',
    emoji: '🦅',
    color: '#84CC16',
    bgLight: '#F7FEE7',
    borderColor: '#BEF264'
  },
  {
    id: 'f',
    char: 'F',
    lower: 'f',
    word: 'Futsal',
    sentence: 'F untuk Futsal! Oper bolanya cepat dan cetak gol kemenangan!',
    sportTag: 'Futsal Kilat',
    emoji: '🥅',
    color: '#10B981',
    bgLight: '#ECFDF5',
    borderColor: '#6EE7B7'
  },
  {
    id: 'g',
    char: 'G',
    lower: 'g',
    word: 'Gawang',
    sentence: 'G untuk Gawang! Kiper sigap menjaga gawang agar tak kebobolan!',
    sportTag: 'Kiper Tangguh',
    emoji: '🧤',
    color: '#06B6D4',
    bgLight: '#ECFEFF',
    borderColor: '#67E8F9'
  },
  {
    id: 'h',
    char: 'H',
    lower: 'h',
    word: 'Helm',
    sentence: 'H untuk Helm! Selalu pakai helm saat balapan dan naik sepeda!',
    sportTag: 'Pembalap Keren',
    emoji: '🪖',
    color: '#0284C7',
    bgLight: '#F0F9FF',
    borderColor: '#7DD3FC'
  },
  {
    id: 'i',
    char: 'I',
    lower: 'i',
    word: 'Ikan',
    sentence: 'I untuk Ikan! Berenang gesit dan lincah di kolam renang!',
    sportTag: 'Renang Cepat',
    emoji: '🏊‍♂️',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    borderColor: '#93C5FD'
  },
  {
    id: 'j',
    char: 'J',
    lower: 'j',
    word: 'Juara',
    sentence: 'J untuk Juara! Berjuang gigih dan angkat piala kebanggaan!',
    sportTag: 'Podium 1',
    emoji: '🏆',
    color: '#EAB308',
    bgLight: '#FEFCE8',
    borderColor: '#FDE047'
  },
  {
    id: 'k',
    char: 'K',
    lower: 'k',
    word: 'Kasti',
    sentence: 'K untuk Kasti! Pukul bolanya jauh lalu lari ke pos aman!',
    sportTag: 'Permainan Kasti',
    emoji: '🏏',
    color: '#8B5CF6',
    bgLight: '#F5F3FF',
    borderColor: '#C4B5FD'
  },
  {
    id: 'l',
    char: 'L',
    lower: 'l',
    word: 'Lari',
    sentence: 'L untuk Lari! Siap... bersedia... yak lari sekuat tenaga!',
    sportTag: 'Sprint Emas',
    emoji: '👟',
    color: '#EC4899',
    bgLight: '#FDF2F8',
    borderColor: '#F472B6'
  },
  {
    id: 'm',
    char: 'M',
    lower: 'm',
    word: 'Medali',
    sentence: 'M untuk Medali! Kalungkan medali emas karena kamu hebat!',
    sportTag: 'Medali Emas',
    emoji: '🥇',
    color: '#F59E0B',
    bgLight: '#FFFBEB',
    borderColor: '#FCD34D'
  },
  {
    id: 'n',
    char: 'N',
    lower: 'n',
    word: 'Nomor',
    sentence: 'N untuk Nomor! Nomor 10 di punggung kaos pemain andalan!',
    sportTag: 'Nomor Punggung',
    emoji: '🔟',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    borderColor: '#93C5FD'
  },
  {
    id: 'o',
    char: 'O',
    lower: 'o',
    word: 'Operan',
    sentence: 'O untuk Operan! Kerjasama tim hebat dengan operan yang tepat!',
    sportTag: 'Taktik Tim',
    emoji: '🎯',
    color: '#14B8A6',
    bgLight: '#F0FDFA',
    borderColor: '#5EEAD4'
  },
  {
    id: 'p',
    char: 'P',
    lower: 'p',
    word: 'Peluit',
    sentence: 'P untuk Peluit! Priiiit! Tanda pertandingan seru dimulai!',
    sportTag: 'Wasit Lapangan',
    emoji: '📢',
    color: '#F43F5E',
    bgLight: '#FFF1F2',
    borderColor: '#FDA4AF'
  },
  {
    id: 'q',
    char: 'Q',
    lower: 'q',
    word: 'Quick',
    sentence: 'Q untuk Quick! Gerakan cepat kilat mengecoh lawan main!',
    sportTag: 'Aksi Kilat',
    emoji: '⚡',
    color: '#EAB308',
    bgLight: '#FEFCE8',
    borderColor: '#FDE047'
  },
  {
    id: 'r',
    char: 'R',
    lower: 'r',
    word: 'Raket',
    sentence: 'R untuk Raket! Ayunkan raket dan smash shuttlecock kencang!',
    sportTag: 'Bulu Tangkis',
    emoji: '🏸',
    color: '#6366F1',
    bgLight: '#EEF2FF',
    borderColor: '#A5B4FC'
  },
  {
    id: 's',
    char: 'S',
    lower: 's',
    word: 'Sepeda',
    sentence: 'S untuk Sepeda! Gowes sepeda BMX melompati rintangan seru!',
    sportTag: 'Gowes BMX',
    emoji: '🚲',
    color: '#0284C7',
    bgLight: '#F0F9FF',
    borderColor: '#7DD3FC'
  },
  {
    id: 't',
    char: 'T',
    lower: 't',
    word: 'Trofi',
    sentence: 'T untuk Trofi! Angkat piala trofi tinggi-tinggi di atas panggung!',
    sportTag: 'Trofi Juara',
    emoji: '🏅',
    color: '#F59E0B',
    bgLight: '#FFFBEB',
    borderColor: '#FCD34D'
  },
  {
    id: 'u',
    char: 'U',
    lower: 'u',
    word: 'Umpan',
    sentence: 'U untuk Umpan! Kirim umpan lambung cantik ke depan gawang!',
    sportTag: 'Assist Juara',
    emoji: '⚽',
    color: '#10B981',
    bgLight: '#ECFDF5',
    borderColor: '#6EE7B7'
  },
  {
    id: 'v',
    char: 'V',
    lower: 'v',
    word: 'Voli',
    sentence: 'V untuk Voli! Lompat tinggi dan tepis bola melewati net tinggi!',
    sportTag: 'Bola Voli',
    emoji: '🏐',
    color: '#EC4899',
    bgLight: '#FDF2F8',
    borderColor: '#F472B6'
  },
  {
    id: 'w',
    char: 'W',
    lower: 'w',
    word: 'Wasit',
    sentence: 'W untuk Wasit! Adil memimpin lomba dengan sportif dan jujur!',
    sportTag: 'Sportif Selalu',
    emoji: '👮‍♂️',
    color: '#475569',
    bgLight: '#F8FAFC',
    borderColor: '#CBD5E1'
  },
  {
    id: 'x',
    char: 'X',
    lower: 'x',
    word: 'X-Games',
    sentence: 'X untuk X-Games! Atraksi skateboard meluncur di arena rampa!',
    sportTag: 'Skateboard Seru',
    emoji: '🛹',
    color: '#8B5CF6',
    bgLight: '#F5F3FF',
    borderColor: '#C4B5FD'
  },
  {
    id: 'y',
    char: 'Y',
    lower: 'y',
    word: 'Yel-yel',
    sentence: 'Y untuk Yel-yel! Ayo sorak gembira dukung tim kita menang!',
    sportTag: 'Suporter Hebat',
    emoji: '📣',
    color: '#F97316',
    bgLight: '#FFF7ED',
    borderColor: '#FDBA74'
  },
  {
    id: 'z',
    char: 'Z',
    lower: 'z',
    word: 'Zig-zag',
    sentence: 'Z untuk Zig-zag! Lari meliuk-liuk melewati rintangan kerucut cone!',
    sportTag: 'Latihan Gesit',
    emoji: '🏁',
    color: '#059669',
    bgLight: '#ECFDF5',
    borderColor: '#6EE7B7'
  }
];

export const NUMBERS_DATA: NumberItem[] = [
  {
    number: 1,
    word: 'Satu',
    objectName: 'Piala Emas Juara',
    singular: 'Piala Emas',
    emoji: '🏆',
    color: '#F59E0B',
    description: '1 piala megah untuk anak paling berani!',
    items: ['🏆']
  },
  {
    number: 2,
    word: 'Dua',
    objectName: 'Sepatu Bola Keren',
    singular: 'Sepatu Bola',
    emoji: '👟',
    color: '#3B82F6',
    description: 'Sepasang sepatu siap berlari kencang!',
    items: ['👟', '👟']
  },
  {
    number: 3,
    word: 'Tiga',
    objectName: 'Bola Basket Oranye',
    singular: 'Bola Basket',
    emoji: '🏀',
    color: '#EA580C',
    description: '3 bola basket siap masuk ke ring basket!',
    items: ['🏀', '🏀', '🏀']
  },
  {
    number: 4,
    word: 'Empat',
    objectName: 'Mobil Balap Turbo',
    singular: 'Mobil Balap',
    emoji: '🏎️',
    color: '#EF4444',
    description: '4 mobil balap bersiap di garis start!',
    items: ['🏎️', '🏎️', '🏎️', '🏎️']
  },
  {
    number: 5,
    word: 'Lima',
    objectName: 'Medali Emas Juara',
    singular: 'Medali Emas',
    emoji: '🥇',
    color: '#FBBF24',
    description: '5 medali berkilau untuk pemenang sejati!',
    items: ['🥇', '🥇', '🥇', '🥇', '🥇']
  },
  {
    number: 6,
    word: 'Enam',
    objectName: 'Helm Balap Aman',
    singular: 'Helm Balap',
    emoji: '🪖',
    color: '#06B6D4',
    description: '6 helm sporty pelindung kepala pembalap!',
    items: ['🪖', '🪖', '🪖', '🪖', '🪖', '🪖']
  },
  {
    number: 7,
    word: 'Tujuh',
    objectName: 'Botol Minum Juara',
    singular: 'Botol Minum',
    emoji: '🥤',
    color: '#10B981',
    description: '7 botol air segar agar badan selalu bugar!',
    items: ['🥤', '🥤', '🥤', '🥤', '🥤', '🥤', '🥤']
  },
  {
    number: 8,
    word: 'Delapan',
    objectName: 'Skateboard Cepat',
    singular: 'Skateboard',
    emoji: '🛹',
    color: '#8B5CF6',
    description: '8 papan skate meluncur keren di arena!',
    items: ['🛹', '🛹', '🛹', '🛹', '🛹', '🛹', '🛹', '🛹']
  },
  {
    number: 9,
    word: 'Sembilan',
    objectName: 'Peluit Wasit Lapangan',
    singular: 'Peluit Wasit',
    emoji: '📢',
    color: '#F43F5E',
    description: '9 peluit bersiap meniup tanda juara!',
    items: ['📢', '📢', '📢', '📢', '📢', '📢', '📢', '📢', '📢']
  },
  {
    number: 10,
    word: 'Sepuluh',
    objectName: 'Bintang Prestasi Emas',
    singular: 'Bintang Juara',
    emoji: '⭐',
    color: '#EAB308',
    description: '10 bintang gemerlap hadiah ketekunanmu!',
    items: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐']
  }
];

export const COLORS_DATA: ColorItem[] = [
  {
    id: 'merah',
    name: 'Merah',
    teamName: 'Tim Api Balap',
    hex: '#EF4444',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Mobil Balap Merah', emoji: '🏎️' },
      { name: 'Sarung Tinju', emoji: '🥊' },
      { name: 'Apel Segar', emoji: '🍎' },
      { name: 'Bendera Balap Merah', emoji: '🚩' }
    ],
    funFact: 'Warna merah melambangkan keberanian, energi tinggi, dan kecepatan tinggi!'
  },
  {
    id: 'biru',
    name: 'Biru',
    teamName: 'Tim Samudra Juara',
    hex: '#2563EB',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Topi Olahraga Biru', emoji: '🧢' },
      { name: 'Baju Jersey Tim', emoji: '👕' },
      { name: 'Kolam Renang', emoji: '🏊‍♂️' },
      { name: 'Mobil Juara Turbo', emoji: '🚙' }
    ],
    funFact: 'Warna biru melambangkan ketenangan, ketangkasan, dan kecerdasan mengatur strategi!'
  },
  {
    id: 'kuning',
    name: 'Kuning',
    teamName: 'Tim Kilat Juara',
    hex: '#FACC15',
    contrastText: '#854D0E',
    exampleItems: [
      { name: 'Piala Emas', emoji: '🏆' },
      { name: 'Medali Pemenang', emoji: '🥇' },
      { name: 'Kilat Petir Cepat', emoji: '⚡' },
      { name: 'Bintang Prestasi', emoji: '⭐' }
    ],
    funFact: 'Warna kuning melambangkan keceriaan, sinar matahari pagi, dan semangat piala juara!'
  },
  {
    id: 'hijau',
    name: 'Hijau',
    teamName: 'Tim Rumput Stadion',
    hex: '#10B981',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Lapangan Sepak Bola', emoji: '🌱' },
      { name: 'Bola Tenis Hijau', emoji: '🎾' },
      { name: 'Sepatu Futsal', emoji: '👟' },
      { name: 'Sepeda Gunung', emoji: '🚲' }
    ],
    funFact: 'Warna hijau melambangkan kesegaran alam, kesehatan tubuh, dan lapangan luas!'
  },
  {
    id: 'oranye',
    name: 'Oranye',
    teamName: 'Tim Bola Basket',
    hex: '#F97316',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Bola Basket Oranye', emoji: '🏀' },
      { name: 'Cone Kerucut Balap', emoji: '🔶' },
      { name: 'Jus Jeruk Segar', emoji: '🍊' },
      { name: 'Sepatu Lari Nyala', emoji: '🥾' }
    ],
    funFact: 'Warna oranye dibuat dari campuran merah dan kuning, warna penuh keceriaan!'
  },
  {
    id: 'ungu',
    name: 'Ungu',
    teamName: 'Tim Galaksi Bintang',
    hex: '#8B5CF6',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Skateboard Keren', emoji: '🛹' },
      { name: 'Sabuk Karate Juara', emoji: '🥋' },
      { name: 'Botol Minum Keren', emoji: '🧃' },
      { name: 'Kacamata Renang', emoji: '🥽' }
    ],
    funFact: 'Warna ungu dibuat dari campuran merah dan biru, warna para petualang hebat!'
  },
  {
    id: 'hitam',
    name: 'Hitam',
    teamName: 'Tim Ban Balap Tangguh',
    hex: '#1E293B',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Ban Mobil Balap Kuat', emoji: '🛞' },
      { name: 'Peluit Wasit Hitam', emoji: '📢' },
      { name: 'Helm Balap Hitam', emoji: '🪖' },
      { name: 'Bendera Finish Kotak', emoji: '🏁' }
    ],
    funFact: 'Ban mobil balap berwarna hitam agar sangat kuat melibas aspal sirkuit!'
  },
  {
    id: 'putih',
    name: 'Putih',
    teamName: 'Tim Garis Finish',
    hex: '#FFFFFF',
    contrastText: '#1E293B',
    exampleItems: [
      { name: 'Garis Putih Lapangan', emoji: '⚪' },
      { name: 'Jaring Gawang', emoji: '🥅' },
      { name: 'Bola Sepak Klasik', emoji: '⚽' },
      { name: 'Kaos Kaki Olahraga', emoji: '🧦' }
    ],
    funFact: 'Garis putih membatasi lapangan agar semua pemain bermain jujur dan sportif!'
  },
  {
    id: 'cokelat',
    name: 'Cokelat',
    teamName: 'Tim Arena Petualang',
    hex: '#92400E',
    contrastText: '#FFFFFF',
    exampleItems: [
      { name: 'Tongkat Kasti Kayu', emoji: '🏏' },
      { name: 'Sarung Tangan Bisbol', emoji: '🧤' },
      { name: 'Arena Tanah Sirkuit', emoji: '🪵' },
      { name: 'Sepatu Hiking Tangguh', emoji: '🥾' }
    ],
    funFact: 'Warna tanah dan kayu tempat kita melompat dan berpetualang di luar ruangan!'
  }
];

export const STICKERS_DATA: StickerItem[] = [
  {
    id: 'stk-1',
    name: 'Mobil Turbo Petir',
    emoji: '🏎️',
    requiredStars: 1,
    sportCategory: 'Balap Mobil',
    flavorText: 'Mobil balap tercepat di sirkuit mini!'
  },
  {
    id: 'stk-2',
    name: 'Piala Emas Bintang',
    emoji: '🏆',
    requiredStars: 3,
    sportCategory: 'Penghargaan',
    flavorText: 'Piala kehormatan untuk anak yang rajin belajar!'
  },
  {
    id: 'stk-3',
    name: 'Sepatu Kilat Super',
    emoji: '👟',
    requiredStars: 5,
    sportCategory: 'Atletik',
    flavorText: 'Lari melesat cepat ke garis finish!'
  },
  {
    id: 'stk-4',
    name: 'Bola Sepak Bintang',
    emoji: '⚽',
    requiredStars: 8,
    sportCategory: 'Sepak Bola',
    flavorText: 'Tendangan roket selalu masuk gawang!'
  },
  {
    id: 'stk-5',
    name: 'Skateboard Api',
    emoji: '🛹',
    requiredStars: 12,
    sportCategory: 'X-Games',
    flavorText: 'Gaya meluncur paling keren di taman!'
  },
  {
    id: 'stk-6',
    name: 'Helm Juara Formula',
    emoji: '🪖',
    requiredStars: 16,
    sportCategory: 'Keamanan',
    flavorText: 'Kepala selalu aman terlindungi helm keren!'
  },
  {
    id: 'stk-7',
    name: 'Medali Emas Bintang 1',
    emoji: '🥇',
    requiredStars: 20,
    sportCategory: 'Podium',
    flavorText: 'Peringkat nomor satu anak paling pintar!'
  },
  {
    id: 'stk-8',
    name: 'Sepeda BMX Turbo',
    emoji: '🚲',
    requiredStars: 25,
    sportCategory: 'Bersepeda',
    flavorText: 'Gowes melintasi rintangan dengan riang gembira!'
  }
];
