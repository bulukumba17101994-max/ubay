import React, { useState } from 'react';
import { Trophy, Star, Sparkles, Plus, Trash2, Printer, Award, Lock, CheckCircle2 } from 'lucide-react';
import { STICKERS_DATA, StickerItem } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PlacedSticker {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
}

interface StickerPlaygroundProps {
  stars: number;
  onEarnStar: (amount: number) => void;
}

export const StickerPlayground: React.FC<StickerPlaygroundProps> = ({
  stars,
  onEarnStar
}) => {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { id: 'init-1', emoji: '🏎️', name: 'Mobil Turbo', x: 25, y: 65 },
    { id: 'init-2', emoji: '🏆', name: 'Piala Emas', x: 50, y: 35 },
    { id: 'init-3', emoji: '⚽', name: 'Bola Sepak', x: 75, y: 70 }
  ]);
  const [selectedStickerToStamp, setSelectedStickerToStamp] = useState<StickerItem | null>(null);
  const [hasOpenedMysteryBox, setHasOpenedMysteryBox] = useState(false);

  // Determine sporty belt / champion level
  const getChampionLevel = () => {
    if (stars >= 40) return { title: 'Juara Grand Prix Sejati', icon: '🏆', color: 'from-amber-400 to-yellow-500', nextTier: 'Peringkat Maksimal!' };
    if (stars >= 25) return { title: 'Bintang Sirkuit Turbo', icon: '🏎️', color: 'from-red-500 to-orange-500', nextTier: 'Butuh 40 ⭐ untuk Juara Sejati' };
    if (stars >= 15) return { title: 'Kapten Tim Hebat', icon: '🥇', color: 'from-blue-600 to-indigo-600', nextTier: 'Butuh 25 ⭐ untuk Bintang Sirkuit' };
    if (stars >= 5) return { title: 'Pemain Inti Lapangan', icon: '🥈', color: 'from-emerald-500 to-teal-600', nextTier: 'Butuh 15 ⭐ untuk Kapten Tim' };
    return { title: 'Calon Atlet Pemula', icon: '🥉', color: 'from-slate-500 to-slate-700', nextTier: 'Butuh 5 ⭐ untuk Pemain Inti' };
  };

  const currentLevel = getChampionLevel();

  // Stamp sticker on click on stadium
  const handleStadiumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedStickerToStamp) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newPlaced: PlacedSticker = {
      id: `${Date.now()}-${Math.random()}`,
      emoji: selectedStickerToStamp.emoji,
      name: selectedStickerToStamp.name,
      x,
      y
    };

    setPlacedStickers((prev) => [...prev, newPlaced]);
    sound.playPop();
    sound.speak(`Menempelkan stiker ${selectedStickerToStamp.name} di stadion!`);
  };

  const handleSelectStickerForStamp = (sticker: StickerItem) => {
    const isUnlocked = stars >= sticker.requiredStars;
    if (isUnlocked) {
      setSelectedStickerToStamp(sticker);
      sound.playPop();
      sound.speak(`Pilih lokasi di stadion untuk menempelkan stiker ${sticker.name}!`);
    } else {
      sound.playWrong();
      sound.speak(`Stiker ini butuh ${sticker.requiredStars} bintang untuk dibuka!`);
    }
  };

  const handleRemoveSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearPlayground = () => {
    sound.playPop();
    setPlacedStickers([]);
  };

  // Open Mystery Treasure Box
  const handleOpenMysteryBox = () => {
    if (hasOpenedMysteryBox) return;
    setHasOpenedMysteryBox(true);
    sound.playFanfare();
    onEarnStar(3);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 }
    });
    sound.speak('Horeee! Peti Harta Karun Juara terbuka! Kamu dapat bonus 3 Bintang Emas!');
  };

  return (
    <div className="space-y-6">
      {/* Title & Level Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-100 mb-2">
              <Award className="w-3.5 h-3.5" />
              Sistem Hadiah & Koleksi Stiker
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Papan Tempel Stiker Juara
            </h2>
            <p className="text-amber-100 text-sm font-medium mt-1 max-w-xl">
              Kumpulkan bintang untuk membuka aneka stiker olahraga anak laki, lalu tempelkan stiker sesukamu di stadion!
            </p>
          </div>

          {/* Champion Rank Badge */}
          <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 flex items-center gap-3 shrink-0">
            <span className="text-4xl">{currentLevel.icon}</span>
            <div>
              <div className="text-[11px] font-bold text-yellow-200 uppercase">
                Gelar Atlet Kamu:
              </div>
              <div className="text-lg font-black text-white font-display">
                {currentLevel.title}
              </div>
              <div className="text-[10px] text-amber-100">
                {currentLevel.nextTier}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MYSTERY TREASURE CHEST PROMO */}
      {!hasOpenedMysteryBox ? (
        <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 border-3 border-amber-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="text-5xl animate-bounce">
              🎁
            </div>
            <div>
              <h4 className="text-base font-black text-amber-950">
                Peti Kejutan Atlet Cilik!
              </h4>
              <p className="text-xs text-amber-900 font-medium">
                Buka peti ini sekarang untuk mendapatkan hadiah bintang emas tambahan!
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenMysteryBox}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buka Peti (+3 ⭐)</span>
          </button>
        </div>
      ) : null}

      {/* INTERACTIVE STADIUM STICKER CANVAS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-amber-200 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 font-display flex items-center gap-2">
              <span>Stadion & Lintasan Balap Tempel Stiker</span>
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold">
                {placedStickers.length} Stiker Ditempel
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {selectedStickerToStamp
                ? `👉 Sekarang klik area stadion di bawah untuk menempelkan stiker [${selectedStickerToStamp.name}]!`
                : 'Pilih stiker di daftar bawah, lalu klik di dalam stadion untuk menempelkannya.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearPlayground}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>
          </div>
        </div>

        {/* The Stadium Grass & Track Pitch */}
        <div
          onClick={handleStadiumClick}
          className="relative w-full h-[360px] sm:h-[420px] rounded-3xl bg-gradient-to-b from-sky-300 via-emerald-600 to-emerald-700 border-4 border-amber-400 overflow-hidden cursor-crosshair shadow-inner select-none"
        >
          {/* Running track border oval */}
          <div className="absolute inset-4 border-8 border-dashed border-red-500/70 rounded-3xl pointer-events-none" />
          {/* Soccer center field circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/50 rounded-full pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/50 pointer-events-none" />

          {/* Goal areas */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-36 border-4 border-white/60 pointer-events-none rounded-r-xl" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-36 border-4 border-white/60 pointer-events-none rounded-l-xl" />

          {/* Placed Stickers on Stadium */}
          {placedStickers.map((stk) => (
            <div
              key={stk.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group transition-transform hover:scale-125"
              style={{ left: `${stk.x}%`, top: `${stk.y}%` }}
              title={stk.name}
            >
              <span className="text-4xl sm:text-5xl drop-shadow-xl inline-block filter">
                {stk.emoji}
              </span>
              <button
                onClick={(e) => handleRemoveSticker(stk.id, e)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-black opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-md transition-opacity"
                title="Hapus stiker"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Helper hint banner */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xs px-4 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-md pointer-events-none">
            {selectedStickerToStamp
              ? `Klik di mana saja untuk menempelkan ${selectedStickerToStamp.emoji}!`
              : 'Pilih stiker di bawah, lalu klik di lapangan ini!'}
          </div>
        </div>

        {/* UNLOCKED STICKERS TRAY */}
        <div>
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-2.5">
            Koleksi Stiker Sporty Kamu (Ketuk untuk Menempel):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {STICKERS_DATA.map((sticker) => {
              const isUnlocked = stars >= sticker.requiredStars;
              const isSelected = selectedStickerToStamp?.id === sticker.id;

              return (
                <button
                  key={sticker.id}
                  onClick={() => handleSelectStickerForStamp(sticker)}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                    !isUnlocked
                      ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 scale-105 shadow-md font-black'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-300 hover:scale-102 cursor-pointer'
                  }`}
                >
                  <span className={`text-3xl ${!isUnlocked ? 'grayscale' : ''}`}>
                    {sticker.emoji}
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                    {sticker.name}
                  </span>
                  {!isUnlocked ? (
                    <span className="text-[9px] font-semibold text-slate-500 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> {sticker.requiredStars}⭐
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-emerald-600">
                      Siap Pakai
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
