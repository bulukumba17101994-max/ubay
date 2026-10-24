import React, { useState } from 'react';
import { Volume2, Sparkles, Award, Palette, CheckCircle2, ChevronRight, Wand2 } from 'lucide-react';
import { COLORS_DATA, ColorItem } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ColorsModuleProps {
  onEarnStar: (amount: number) => void;
}

export const ColorsModule: React.FC<ColorsModuleProps> = ({ onEarnStar }) => {
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLORS_DATA[0]);
  const [carPaintColor, setCarPaintColor] = useState('#2563EB'); // default sporty blue
  const [activeTab, setActiveTab] = useState<'learn' | 'paint' | 'mixer'>('learn');

  // Color Mixer state
  const [mixColor1, setMixColor1] = useState<ColorItem | null>(null);
  const [mixColor2, setMixColor2] = useState<ColorItem | null>(null);
  const [mixedResult, setMixedResult] = useState<{ name: string; hex: string; emoji: string } | null>(null);

  const handleSelectColor = (item: ColorItem) => {
    sound.playPop();
    setSelectedColor(item);
    sound.speak(`Warna ${item.name}! ${item.teamName}! ${item.funFact}`);
  };

  const playSpeech = () => {
    sound.playPop();
    sound.speak(`Warna ${selectedColor.name}. ${selectedColor.teamName}. Contohnya: ${selectedColor.exampleItems.map((e) => e.name).join(', ')}.`);
  };

  const handlePaintCar = (hex: string, name: string) => {
    sound.playPop();
    setCarPaintColor(hex);
    sound.speak(`Mobil balap dicat warna ${name}! Keren sekali!`);
  };

  const handleHorn = () => {
    sound.playWhistle();
    sound.speak('Tin tiiin! Awas mobil balap juara mau lewat!');
  };

  const handleRevEngine = () => {
    sound.playEngineRev();
    sound.speak('Vroooom! Mesin turbo siap melaju kencang!');
  };

  // Run Color Mixer
  const handleMixColors = () => {
    if (!mixColor1 || !mixColor2) return;

    sound.playPop();
    const ids = [mixColor1.id, mixColor2.id].sort().join('+');

    let result = { name: 'Warna Ajaib', hex: '#6366F1', emoji: '✨' };

    if (ids === 'kuning+merah') {
      result = { name: 'Oranye (Jingga)', hex: '#F97316', emoji: '🍊' };
    } else if (ids === 'biru+kuning') {
      result = { name: 'Hijau Segar', hex: '#10B981', emoji: '🌱' };
    } else if (ids === 'biru+merah') {
      result = { name: 'Ungu Bintang', hex: '#8B5CF6', emoji: '🍇' };
    } else if (ids === 'merah+putih') {
      result = { name: 'Merah Muda (Pink)', hex: '#F472B6', emoji: '🌸' };
    } else if (ids === 'hitam+putih') {
      result = { name: 'Abu-abu Netral', hex: '#94A3B8', emoji: '🌪️' };
    } else {
      result = {
        name: `Campuran ${mixColor1.name} & ${mixColor2.name}`,
        hex: mixColor1.hex,
        emoji: '🎨'
      };
    }

    setMixedResult(result);
    sound.playCorrect();
    onEarnStar(1);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    sound.speak(`Campuran ${mixColor1.name} dan ${mixColor2.name} menghasilkan warna ${result.name}! Luar biasa!`);
  };

  const resetMixer = () => {
    sound.playPop();
    setMixColor1(null);
    setMixColor2(null);
    setMixedResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          🎨
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-200 mb-2">
              <Award className="w-3.5 h-3.5" />
              Stadion Warna Juara
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Mengenal Aneka Warna Dasar
            </h2>
            <p className="text-teal-100 text-sm font-medium mt-1 max-w-xl">
              Kenali warna tim olahraga, semprot cat mobil balap sesukamu, dan campurkan warna ajaib!
            </p>
          </div>

          {/* Sub-mode navigation tabs */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => {
                setActiveTab('learn');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'learn'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Kenal Warna
            </button>
            <button
              onClick={() => {
                setActiveTab('paint');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'paint'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🏎️ Cat Mobil
            </button>
            <button
              onClick={() => {
                setActiveTab('mixer');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'mixer'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🧪 Campur Warna
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'paint' ? (
        /* INTERACTIVE RACE CAR SPRAY PAINT WORKSHOP */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-cyan-200 shadow-lg space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-extrabold uppercase mb-2">
              Bengkel Mobil Balap Juara
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Cat Mobil Balap Kesukaanmu!
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Pilih warna cat di bawah untuk mewarnai mobil balap turbo nomor 7!
            </p>
          </div>

          {/* Car Interactive Canvas Display */}
          <div className="relative bg-gradient-to-b from-sky-100 to-slate-200 rounded-3xl p-6 sm:p-8 border-3 border-cyan-300 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
            {/* Checkerboard finish line backdrop */}
            <div className="absolute bottom-0 w-full h-8 bg-checker-pattern opacity-40 border-t border-slate-300" />

            {/* Scalable Vector Cartoon Race Car with dynamic painted body */}
            <div className="relative z-10 w-64 sm:w-80 transition-all duration-500 transform hover:scale-105">
              <svg viewBox="0 0 400 240" className="w-full drop-shadow-2xl">
                {/* Car Shadow */}
                <ellipse cx="200" cy="215" rx="160" ry="16" fill="rgba(0,0,0,0.25)" />

                {/* Rear Spoiler */}
                <path
                  d="M 50 110 L 80 110 L 75 140 L 45 140 Z"
                  fill="#1E293B"
                  stroke="#0F172A"
                  strokeWidth="3"
                />
                <rect x="35" y="95" width="55" height="15" rx="6" fill={carPaintColor} stroke="#0F172A" strokeWidth="3" />

                {/* Main Painted Body (Dynamically Colored) */}
                <path
                  d="M 60 160 C 60 110, 100 80, 160 80 L 250 80 C 310 80, 360 120, 370 160 C 375 180, 360 190, 330 190 L 80 190 C 60 190, 60 175, 60 160 Z"
                  fill={carPaintColor}
                  stroke="#0F172A"
                  strokeWidth="5"
                  className="transition-colors duration-400"
                />

                {/* Sporty Racing Stripes */}
                <path d="M 170 82 L 230 82 L 235 188 L 175 188 Z" fill="#FACC15" opacity="0.9" />
                <path d="M 185 82 L 215 82 L 220 188 L 190 188 Z" fill="#FFFFFF" opacity="0.95" />

                {/* Windshield Glass */}
                <path
                  d="M 170 86 L 245 86 C 265 86, 275 105, 275 125 L 155 125 C 155 105, 160 86, 170 86 Z"
                  fill="#E0F2FE"
                  stroke="#0F172A"
                  strokeWidth="4"
                />

                {/* Cute Eyes on Windshield */}
                <ellipse cx="195" cy="106" rx="12" ry="14" fill="#FFFFFF" />
                <ellipse cx="235" cy="106" rx="12" ry="14" fill="#FFFFFF" />
                <circle cx="198" cy="107" r="7" fill="#0284C7" />
                <circle cx="238" cy="107" r="7" fill="#0284C7" />
                <circle cx="196" cy="104" r="2.5" fill="#FFFFFF" />
                <circle cx="236" cy="104" r="2.5" fill="#FFFFFF" />

                {/* Champion Number #7 Decal */}
                <circle cx="125" cy="148" r="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
                <text
                  x="125"
                  y="157"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="24"
                  fontWeight="900"
                  fontFamily="Outfit, sans-serif"
                >
                  7
                </text>

                {/* Headlights */}
                <path d="M 355 150 Q 370 155 365 170 Q 350 170 350 155 Z" fill="#FEF08A" stroke="#0F172A" strokeWidth="3" />

                {/* Front Bumper & Cheerful Smile */}
                <path d="M 330 180 Q 345 190 325 192" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Wheels */}
                {/* Back Wheel */}
                <g>
                  <circle cx="115" cy="190" r="34" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="115" cy="190" r="18" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
                  <circle cx="115" cy="190" r="7" fill="#F59E0B" />
                </g>
                {/* Front Wheel */}
                <g>
                  <circle cx="295" cy="190" r="34" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="295" cy="190" r="18" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
                  <circle cx="295" cy="190" r="7" fill="#F59E0B" />
                </g>
              </svg>
            </div>

            {/* Interactive Car Buttons: Klakson & Gas Turbo */}
            <div className="mt-5 flex items-center gap-3 z-10">
              <button
                onClick={handleHorn}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold rounded-2xl shadow-md text-sm flex items-center gap-1.5 active:scale-95"
              >
                <span>📢 Bunyikan Klakson</span>
              </button>
              <button
                onClick={handleRevEngine}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl shadow-md text-sm flex items-center gap-1.5 active:scale-95"
              >
                <span>🔥 Gas Turbo!</span>
              </button>
            </div>
          </div>

          {/* Color Spray Selector Palette */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 mb-3 text-center">
              Pilih Kaleng Cat Semprot:
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {COLORS_DATA.map((col) => {
                const isActive = carPaintColor === col.hex;
                return (
                  <button
                    key={col.id}
                    onClick={() => handlePaintCar(col.hex, col.name)}
                    className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 transition-all ${
                      isActive
                        ? 'border-slate-900 ring-4 ring-cyan-300 scale-108 shadow-lg'
                        : 'border-slate-200 hover:border-slate-400 hover:scale-105'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full shadow-inner flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: col.hex, color: col.contrastText }}
                    >
                      🎨
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">
                      {col.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : activeTab === 'mixer' ? (
        /* MAGIC COLOR MIXING LAB */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-purple-200 shadow-lg space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-extrabold uppercase mb-2">
              Eksperimen Tim Juara
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Campur 2 Warna Ajaib!
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Pilih dua warna di bawah ini, lalu tekan tombol campur untuk melihat warna barunya!
            </p>
          </div>

          {/* Mixing Slots */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Slot 1 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Warna Pertama</span>
              <div
                className="w-24 h-24 rounded-3xl border-3 border-dashed border-purple-300 flex items-center justify-center shadow-md transition-all"
                style={{ backgroundColor: mixColor1 ? mixColor1.hex : '#FFFFFF' }}
              >
                {mixColor1 ? (
                  <span
                    className="font-black text-sm drop-shadow-xs"
                    style={{ color: mixColor1.contrastText }}
                  >
                    {mixColor1.name}
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs font-bold">Pilih 1</span>
                )}
              </div>
            </div>

            <span className="text-3xl font-black text-purple-500">+</span>

            {/* Slot 2 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Warna Kedua</span>
              <div
                className="w-24 h-24 rounded-3xl border-3 border-dashed border-purple-300 flex items-center justify-center shadow-md transition-all"
                style={{ backgroundColor: mixColor2 ? mixColor2.hex : '#FFFFFF' }}
              >
                {mixColor2 ? (
                  <span
                    className="font-black text-sm drop-shadow-xs"
                    style={{ color: mixColor2.contrastText }}
                  >
                    {mixColor2.name}
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs font-bold">Pilih 2</span>
                )}
              </div>
            </div>

            <span className="text-3xl font-black text-purple-500">=</span>

            {/* Result Slot */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-purple-700">Hasil Campuran</span>
              <div
                className="w-28 h-28 rounded-3xl border-4 border-amber-300 flex flex-col items-center justify-center shadow-xl transition-all"
                style={{ backgroundColor: mixedResult ? mixedResult.hex : '#F3F4F6' }}
              >
                {mixedResult ? (
                  <div className="text-center p-2">
                    <span className="text-2xl">{mixedResult.emoji}</span>
                    <p className="text-xs font-black text-white drop-shadow-md">
                      {mixedResult.name}
                    </p>
                  </div>
                ) : (
                  <Sparkles className="w-8 h-8 text-slate-300" />
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handleMixColors}
              disabled={!mixColor1 || !mixColor2}
              className={`px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all ${
                mixColor1 && mixColor2
                  ? 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Campurkan Warnanya!</span>
            </button>
            <button
              onClick={resetMixer}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm"
            >
              Reset
            </button>
          </div>

          {/* Color Palettes to select for mixing */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2.5 text-center">
              Ketuk untuk memilih warna yang akan dicampur:
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {COLORS_DATA.map((col) => (
                <button
                  key={col.id}
                  onClick={() => {
                    sound.playPop();
                    if (!mixColor1) {
                      setMixColor1(col);
                    } else if (!mixColor2) {
                      setMixColor2(col);
                    } else {
                      setMixColor1(col);
                      setMixColor2(null);
                      setMixedResult(null);
                    }
                  }}
                  className="px-3.5 py-2 rounded-2xl font-black text-xs border-2 border-slate-200 hover:scale-105 transition-transform flex items-center gap-1.5 shadow-xs"
                  style={{ backgroundColor: col.hex, color: col.contrastText }}
                >
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD COLOR LEARNING STAGE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Color Spotlight Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-3 border-emerald-200 shadow-lg space-y-6">
            <div
              onClick={() => sound.speakTouch(`Warna ${selectedColor.name}! ${selectedColor.teamName}! ${selectedColor.funFact}`)}
              className="rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden transition-all duration-300 shadow-md cursor-pointer hover:scale-101 active:scale-98"
              style={{ backgroundColor: selectedColor.hex }}
              title="Ketuk untuk mendengar warna"
            >
              <div className="relative z-10 space-y-2">
                <span
                  className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-black/20 text-white backdrop-blur-xs"
                >
                  {selectedColor.teamName}
                </span>

                <h3
                  className="text-5xl sm:text-6xl font-black font-display drop-shadow-md"
                  style={{ color: selectedColor.contrastText }}
                >
                  {selectedColor.name}
                </h3>

                <p
                  className="text-base sm:text-lg font-bold max-w-md mx-auto pt-2 opacity-95"
                  style={{ color: selectedColor.contrastText }}
                >
                  "{selectedColor.funFact}"
                </p>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={playSpeech}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-extrabold rounded-2xl shadow-lg hover:bg-slate-100 transition-all active:scale-95 text-sm"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Dengarkan Suara</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Example items of this color */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 mb-3">
                Benda Berwarna {selectedColor.name}:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedColor.exampleItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sound.playPop();
                      sound.speak(`${item.name} berwarna ${selectedColor.name}!`);
                    }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-300 rounded-2xl flex flex-col items-center justify-center text-center gap-1 transition-all active:scale-95"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Fast Quick Color Grid & Facts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-5 border-3 border-emerald-200 shadow-md">
              <h4 className="text-base font-extrabold text-slate-900 mb-3">
                Pilih Warna Lainnya:
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {COLORS_DATA.map((col) => {
                  const isSelected = selectedColor.id === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => handleSelectColor(col)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                        isSelected
                          ? 'border-slate-900 ring-3 ring-emerald-300 scale-105 shadow-md'
                          : 'border-slate-200 hover:border-slate-400 hover:scale-102'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full shadow-inner border border-white/50"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-xs font-extrabold text-slate-800">
                        {col.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-3xl p-5 flex items-start gap-3 shadow-xs">
              <span className="text-3xl">🏁</span>
              <div>
                <h5 className="text-sm font-bold text-teal-950">
                  Warna Favorit Anak Laki Sporty:
                </h5>
                <p className="text-xs text-teal-900 font-medium mt-1 leading-relaxed">
                  Semua warna memiliki kekuatan unik! Merah melambangkan kecepatan, Biru ketenangan kiper, dan Kuning kemilau piala juara!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
