import React, { useState } from 'react';
import { Trophy, Star, Sparkles, Lock, CheckCircle2, RotateCcw, Printer, Award, Palette, Shirt } from 'lucide-react';
import { STICKERS_DATA, StickerItem } from '../data/learningData';
import { StickerPlayground } from './StickerPlayground';
import { AvatarConfig } from '../types/avatar';
import { SportyAvatar } from './SportyAvatar';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TrophyRoomProps {
  stars: number;
  onResetStars: () => void;
  onSelectTab: (tab: string) => void;
  avatarConfig: AvatarConfig;
  onEarnStar: (amount: number) => void;
}

export const TrophyRoom: React.FC<TrophyRoomProps> = ({
  stars,
  onResetStars,
  onSelectTab,
  avatarConfig,
  onEarnStar
}) => {
  const [selectedSticker, setSelectedSticker] = useState<StickerItem | null>(null);
  const [childName, setChildName] = useState('Boni Juara');
  const [showCertificate, setShowCertificate] = useState(false);
  const [viewMode, setViewMode] = useState<'playground' | 'album'>('playground');

  const handleInspectSticker = (sticker: StickerItem) => {
    const isUnlocked = stars >= sticker.requiredStars;
    if (isUnlocked) {
      sound.playFanfare();
      setSelectedSticker(sticker);
      sound.speak(`Stiker ${sticker.name}! ${sticker.flavorText}`);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      sound.playWrong();
      sound.speak(`Kumpulkan ${sticker.requiredStars} bintang untuk membuka stiker ${sticker.name}!`);
    }
  };

  const handlePrintCertificate = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Avatar & Stars */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          🏆
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Child's Sporty Avatar on Trophy Podium */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md p-1 border-3 border-white/50 flex items-center justify-center shrink-0 shadow-lg">
              <SportyAvatar config={avatarConfig} size={80} showBody={false} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-amber-950 mb-1">
                <Trophy className="w-3.5 h-3.5" />
                Kamar Prestasi & Koleksi Stiker
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                Koleksi Trofi Juara Cilik
              </h2>
              <p className="text-amber-100 text-xs sm:text-sm font-medium mt-0.5 max-w-xl">
                Buka stiker keren, tempelkan di stadion, dan raih piagam penghargaan!
              </p>
            </div>
          </div>

          {/* Sub Navigation between Playground & Album & Certificate */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setViewMode('playground');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                viewMode === 'playground'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              🏟️ Tempel Stiker
            </button>
            <button
              onClick={() => {
                setViewMode('album');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                viewMode === 'album'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              📖 Buku Stiker
            </button>
            <button
              onClick={() => {
                setShowCertificate(!showCertificate);
                sound.playPop();
              }}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
            >
              📜 Piagam
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: STICKER PLAYGROUND */}
      {viewMode === 'playground' && (
        <StickerPlayground stars={stars} onEarnStar={onEarnStar} />
      )}

      {/* VIEW 2: TRADITIONAL STICKER ALBUM */}
      {viewMode === 'album' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <span>Buku Stiker Olahraga Juara</span>
                <span className="text-xs px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold">
                  {STICKERS_DATA.filter((s) => stars >= s.requiredStars).length} / {STICKERS_DATA.length} Terbuka
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Ketuk stiker yang sudah terbuka untuk melihat aksinya!
              </p>
            </div>
          </div>

          {/* Sticker Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {STICKERS_DATA.map((sticker) => {
              const isUnlocked = stars >= sticker.requiredStars;
              return (
                <button
                  key={sticker.id}
                  onClick={() => handleInspectSticker(sticker)}
                  className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center text-center gap-2 transition-all group ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer'
                      : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="relative">
                    <span className={`text-5xl sm:text-6xl transition-transform ${isUnlocked ? 'group-hover:scale-110 animate-soft-bounce' : 'grayscale opacity-40'}`}>
                      {sticker.emoji}
                    </span>
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-slate-800/80 text-white flex items-center justify-center shadow-md">
                          <Lock className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">
                      {sticker.name}
                    </h4>
                    <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                      {isUnlocked ? (
                        <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Terbuka
                        </span>
                      ) : (
                        <span>Butuh {sticker.requiredStars} ⭐</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSticker && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-center space-y-2">
              <div className="text-5xl">{selectedSticker.emoji}</div>
              <h4 className="text-lg font-black text-amber-950 font-display">
                {selectedSticker.name}
              </h4>
              <p className="text-sm font-semibold text-amber-900 max-w-md mx-auto">
                "{selectedSticker.flavorText}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* PRINTABLE CHAMPION CERTIFICATE */}
      {showCertificate && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl space-y-6 print:m-0 print:border-none print:shadow-none">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Piagam Penghargaan Juara Cilik
              </h3>
              <p className="text-xs text-slate-500">
                Ketik nama anak untuk dicetak di piagam penghargaan bersama avatarnya
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Nama Juara..."
                className="px-3.5 py-1.5 border-2 border-blue-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Piagam</span>
              </button>
            </div>
          </div>

          {/* Certificate Graphic Box */}
          <div className="p-8 sm:p-12 rounded-3xl border-8 border-double border-amber-400 bg-gradient-to-b from-yellow-50 via-white to-amber-50 text-center space-y-4 relative overflow-hidden">
            <div className="flex justify-center my-2">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-amber-400 shadow-xl flex items-center justify-center p-2">
                <SportyAvatar config={avatarConfig} size={80} showBody={false} />
              </div>
            </div>

            <div className="inline-block px-4 py-1 bg-amber-200 text-amber-950 rounded-full text-xs font-black uppercase tracking-widest">
              SERTIFIKAT KELULUSAN TK SPORTY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 font-display">
              JUARA CILIK BERPRESTASI
            </h2>
            <p className="text-sm font-medium text-slate-600 max-w-lg mx-auto">
              Diberikan dengan bangga atas ketekunan dan keberanian belajar huruf A-Z, angka 1-10, aneka warna dasar, dan menyelesaikan mini-games olahraga kepada:
            </p>
            <div className="text-3xl sm:text-4xl font-black text-red-600 font-display underline decoration-amber-400 py-1">
              {childName || 'Sang Juara'}
            </div>
            <p className="text-xs font-bold text-slate-500">
              Dengan capaian <span className="text-amber-600 font-black">{stars} Bintang Kehormatan ⭐</span> (Jersey #{avatarConfig.jerseyNumber})
            </p>
          </div>
        </div>
      )}

      {/* Quick Jump Buttons to keep learning */}
      <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            Mau kumpulkan lebih banyak bintang?
          </h4>
          <p className="text-xs text-slate-500">
            Mainkan mini game seru, kuis sirkuit balap, atau pelajari huruf dan angka!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('minigames')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
          >
            🎮 Main Mini Games
          </button>
          <button
            onClick={() => onSelectTab('avatar')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
          >
            👕 Ganti Kostum Avatar
          </button>
        </div>
      </div>
    </div>
  );
};
