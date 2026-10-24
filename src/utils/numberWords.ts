/**
 * Utility to convert numbers 1-100 into natural Indonesian words
 * with child-friendly sports item descriptions and emojis.
 */

const ONES = [
  '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima',
  'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh',
  'Sebelas'
];

export function getIndonesianNumberWord(n: number): string {
  if (n <= 11) return ONES[n];
  if (n < 20) {
    return `${ONES[n - 10]} Belas`;
  }
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const remainder = n % 10;
    if (remainder === 0) {
      return `${ONES[tens]} Puluh`;
    }
    return `${ONES[tens]} Puluh ${ONES[remainder]}`;
  }
  if (n === 100) {
    return 'Seratus';
  }
  return `${n}`;
}

export function getSportEmojiForNumber(n: number): string {
  const emojis = ['🏆', '⚽', '🏀', '🏎️', '🥇', '🪖', '🥤', '🛹', '📢', '⭐', '👟', '🚲', '🥊', '🥋', '🏸', '🏊‍♂️'];
  return emojis[(n - 1) % emojis.length];
}

export function getSportThemeDescription(n: number): { objectName: string; emoji: string } {
  const word = getIndonesianNumberWord(n);
  const emoji = getSportEmojiForNumber(n);

  let objectName = `${n} Bintang Prestasi`;
  if (n === 1) objectName = '1 Piala Emas Megah';
  else if (n === 10) objectName = '10 Bintang Juara';
  else if (n === 20) objectName = '20 Bola Sepak Tim';
  else if (n === 50) objectName = '50 Medali Emas Lapangan';
  else if (n === 100) objectName = '100 Trofi Pemenang Grand Slam';
  else if (n % 10 === 0) objectName = `${n} Bendera Balap Sirkuit`;
  else if (n % 2 === 0) objectName = `${n} Sepatu Lari Atlet`;
  else objectName = `${n} Bola Basket Energi`;

  return { objectName, emoji };
}
