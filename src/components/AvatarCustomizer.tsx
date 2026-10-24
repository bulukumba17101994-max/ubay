import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, Award, Shirt, Palette, Smile, Glasses, UserCheck } from 'lucide-react';
import { AvatarConfig, DEFAULT_AVATAR } from '../types/avatar';
import { SportyAvatar } from './SportyAvatar';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AvatarCustomizerProps {
  currentConfig: AvatarConfig;
  onSaveAvatar: (newConfig: AvatarConfig) => void;
  onEarnStar?: (amount: number) => void;
}

export const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  currentConfig,
  onSaveAvatar,
  onEarnStar
}) => {
  const [config, setConfig] = useState<AvatarConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'hat' | 'jersey' | 'pants-shoes' | 'accessory'>('hat');
  const [hasSaved, setHasSaved] = useState(false);

  const headwearOptions = [
    { id: 'cap-backward', label: 'Topi Terbalik', icon: '🧢' },
    { id: 'cap-forward', label: 'Topi Depan', icon: '🧢' },
    { id: 'helmet', label: 'Helm Balap', icon: '🪖' },
    { id: 'headband', label: 'Bandana Lari', icon: '🎗️' },
    { id: 'spiky-hair', label: 'Rambut Spike', icon: '⚡' },
    { id: 'curly-hair', label: 'Rambut Ikal', icon: '🌀' }
  ];

  const colorsPalette = [
    { name: 'Biru Tim', hex: '#2563EB' },
    { name: 'Merah Api', hex: '#EF4444' },
    { name: 'Kuning Kilat', hex: '#FACC15' },
    { name: 'Hijau Lapangan', hex: '#10B981' },
    { name: 'Oranye Basket', hex: '#F97316' },
    { name: 'Ungu Bintang', hex: '#8B5CF6' },
    { name: 'Hitam Turbo', hex: '#1E293B' },
    { name: 'Putih Bersih', hex: '#FFFFFF' }
  ];

  const hairColors = [
    { name: 'Hitam', hex: '#1C1917' },
    { name: 'Cokelat Tua', hex: '#451A03' },
    { name: 'Cokelat Madu', hex: '#92400E' },
    { name: 'Pirang Emas', hex: '#D97706' }
  ];

  const jerseyNumbers = [7, 10, 1, 9, 23, 99];

  const accessoryOptions = [
    { id: 'gold-medal', label: 'Medali Emas', icon: '🥇' },
    { id: 'referee-whistle', label: 'Peluit Wasit', icon: '📢' },
    { id: 'cool-sunglasses', label: 'Kacamata Hitam', icon: '🕶️' },
    { id: 'wristband', label: 'Gelang Atlet', icon: '⚡' },
    { id: 'none', label: 'Tanpa Aksesoris', icon: '🚫' }
  ];

  const expressionOptions = [
    { id: 'happy', label: 'Senyum Ceria', icon: '😊' },
    { id: 'wink', label: 'Kedip Juara', icon: '😉' },
    { id: 'excited', label: 'Sangat Semangat!', icon: '🤩' }
  ];

  // Presets for quick fun selection
  const presets = [
    {
      name: 'Pembalap Turbo #7',
      config: {
        ...DEFAULT_AVATAR,
        headwear: 'helmet' as const,
        headwearColor: '#EF4444',
        jerseyColor: '#2563EB',
        jerseyPattern: 'lightning' as const,
        jerseyNumber: 7,
        shoesColor: '#FACC15',
        accessory: 'cool-sunglasses' as const
      }
    },
    {
      name: 'Kapten Bola #10',
      config: {
        ...DEFAULT_AVATAR,
        headwear: 'cap-backward' as const,
        headwearColor: '#2563EB',
        jerseyColor: '#10B981',
        jerseyPattern: 'stripes' as const,
        jerseyNumber: 10,
        shoesColor: '#EF4444',
        accessory: 'gold-medal' as const
      }
    },
    {
      name: 'Bintang Basket #23',
      config: {
        ...DEFAULT_AVATAR,
        headwear: 'headband' as const,
        headwearColor: '#F97316',
        jerseyColor: '#F97316',
        jerseyPattern: 'stripes' as const,
        jerseyNumber: 23,
        shoesColor: '#1E293B',
        accessory: 'wristband' as const
      }
    }
  ];

  const handleUpdate = (updates: Partial<AvatarConfig>, voiceDesc?: string) => {
    sound.playPop();
    const updated = { ...config, ...updates };
    setConfig(updated);
    setHasSaved(false);
    if (voiceDesc) {
      sound.speak(voiceDesc);
    }
  };

  const handleApplyPreset = (p: typeof presets[0]) => {
    sound.playFanfare();
    setConfig(p.config);
    setHasSaved(false);
    sound.speak(`Keren! Kostum ${p.name} dipilih!`);
  };

  const handleSave = () => {
    sound.playFanfare();
    onSaveAvatar(config);
    setHasSaved(true);
    if (onEarnStar) {
      onEarnStar(1);
    }
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    sound.speak('Horeee! Avatarmu sudah disimpan! Tampil gagah di lapangan!');
  };

  const handleReset = () => {
    sound.playPop();
    setConfig(DEFAULT_AVATAR);
    setHasSaved(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          👕
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ruang Ganti Atlet Cilik
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Kustomisasi Avatar Sporty
            </h2>
            <p className="text-blue-100 text-sm font-medium mt-1 max-w-xl">
              Pilih topi balap, warna jersey, celana, sepatu lari, dan aksesoris medali juaramu sendiri!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-amber-400/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <Check className="w-5 h-5" />
              <span>Simpan Avatar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LIVE AVATAR STAGE */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-3 border-blue-200 shadow-lg flex flex-col items-center text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-extrabold uppercase">
            Penampilan Juara Cilik
          </div>

          {/* Avatar Podium Stage */}
          <div className="relative w-full aspect-square max-w-[280px] bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100 rounded-3xl border-3 border-blue-300 flex items-center justify-center p-4 shadow-inner overflow-hidden">
            {/* Background stadium light beams */}
            <div className="absolute inset-0 bg-track-lines opacity-20 pointer-events-none" />

            <SportyAvatar config={config} size={230} showBody={true} />

            {/* Float badge for jersey number */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-md border border-blue-200 flex items-center gap-1 text-xs font-black text-blue-900">
              <span>Jersey #{config.jerseyNumber}</span>
            </div>
          </div>

          {hasSaved && (
            <div className="w-full p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 animate-bounce">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              Avatar Tersimpan di Seluruh Game!
            </div>
          )}

          {/* Quick Presets */}
          <div className="w-full pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 block mb-2">
              Pilihan Kostum Cepat:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleApplyPreset(p)}
                  className="px-2 py-2 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl text-[11px] font-bold text-slate-700 hover:text-blue-700 transition-all active:scale-95"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 pt-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Kembalikan ke Semula
          </button>
        </div>

        {/* RIGHT COLUMN: CUSTOMIZATION CONTROLS DECK */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-3 border-blue-200 shadow-lg space-y-6">
          {/* Sub Navigation Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab('hat');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'hat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <span>🧢 Topi & Rambut</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('jersey');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'jersey'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <span>👕 Baju Jersey</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('pants-shoes');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'pants-shoes'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <span>👟 Celana & Sepatu</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('accessory');
                sound.playPop();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'accessory'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <span>🥇 Aksesoris & Wajah</span>
            </button>
          </div>

          {/* TAB 1: TOPI & RAMBUT */}
          {activeTab === 'hat' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Headwear style selector */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  1. Pilih Gaya Topi atau Rambut:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {headwearOptions.map((opt) => {
                    const isSelected = config.headwear === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleUpdate({ headwear: opt.id as any }, `Memilih ${opt.label}!`)}
                        className={`p-3 rounded-2xl border-2 flex items-center gap-2 text-left transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300 text-blue-900 font-black'
                            : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-xs">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Headwear Color */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  2. Warna Topi / Helm / Bandana:
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {colorsPalette.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleUpdate({ headwearColor: col.hex }, `Warna topi ${col.name}!`)}
                      className={`h-11 rounded-2xl border-2 flex items-center justify-center transition-all ${
                        config.headwearColor === col.hex
                          ? 'border-slate-900 ring-3 ring-blue-300 scale-108 shadow-md'
                          : 'border-slate-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {config.headwearColor === col.hex && (
                        <Check className="w-5 h-5 text-white filter drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  3. Warna Rambut:
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {hairColors.map((h) => (
                    <button
                      key={h.hex}
                      onClick={() => handleUpdate({ hairColor: h.hex }, `Warna rambut ${h.name}!`)}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        config.hairColor === h.hex
                          ? 'border-blue-600 bg-blue-50 font-black'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: h.hex }} />
                      <span>{h.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BAJU JERSEY */}
          {activeTab === 'jersey' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Jersey Color */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  1. Pilih Warna Jersey Tim:
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {colorsPalette.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleUpdate({ jerseyColor: col.hex }, `Jersey warna ${col.name}!`)}
                      className={`h-11 rounded-2xl border-2 flex items-center justify-center transition-all ${
                        config.jerseyColor === col.hex
                          ? 'border-slate-900 ring-3 ring-blue-300 scale-108 shadow-md'
                          : 'border-slate-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {config.jerseyColor === col.hex && (
                        <Check className="w-5 h-5 text-white filter drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jersey Pattern */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  2. Motif Jersey:
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'stripes', label: 'Garis Atletik', icon: '║║' },
                    { id: 'lightning', label: 'Petir Turbo', icon: '⚡' },
                    { id: 'solid', label: 'Polos Klasik', icon: '■' }
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => handleUpdate({ jerseyPattern: pat.id as any })}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                        config.jerseyPattern === pat.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-black ring-2 ring-blue-200'
                          : 'bg-slate-50 border-slate-200 text-slate-700 font-bold'
                      }`}
                    >
                      <span className="text-xl">{pat.icon}</span>
                      <span className="text-xs">{pat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Jersey Number */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  3. Nomor Punggung Favorit:
                </h4>
                <div className="grid grid-cols-6 gap-2">
                  {jerseyNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => handleUpdate({ jerseyNumber: num }, `Nomor punggung ${num}!`)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all ${
                        config.jerseyNumber === num
                          ? 'bg-blue-600 text-white font-black scale-105 shadow-md border-blue-700'
                          : 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800 font-bold'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-black font-display">
                        #{num}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CELANA & SEPATU */}
          {activeTab === 'pants-shoes' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Shorts Color */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  1. Warna Celana Pendek Sporty:
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[
                    { name: 'Navy Keren', hex: '#1E293B' },
                    { name: 'Biru Tim', hex: '#2563EB' },
                    { name: 'Merah Lari', hex: '#EF4444' },
                    { name: 'Putih Garis', hex: '#F1F5F9' },
                    { name: 'Hijau Rumput', hex: '#10B981' },
                    { name: 'Oranye Ceria', hex: '#F97316' }
                  ].map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleUpdate({ shortsColor: col.hex }, `Celana ${col.name}!`)}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        config.shortsColor === col.hex
                          ? 'border-blue-600 bg-blue-50 font-black ring-2 ring-blue-300'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border shadow-inner" style={{ backgroundColor: col.hex }} />
                      <span className="truncate">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoes Color */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  2. Warna Sepatu Sneaker Olahraga:
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[
                    { name: 'Merah Api', hex: '#EF4444' },
                    { name: 'Kuning Kilat', hex: '#FACC15' },
                    { name: 'Biru Cepat', hex: '#2563EB' },
                    { name: 'Hijau Futsal', hex: '#10B981' },
                    { name: 'Hitam Tangguh', hex: '#1E293B' },
                    { name: 'Putih Sporty', hex: '#E2E8F0' }
                  ].map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleUpdate({ shoesColor: col.hex }, `Sepatu sneaker ${col.name}!`)}
                      className={`p-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        config.shoesColor === col.hex
                          ? 'border-blue-600 bg-blue-50 font-black ring-2 ring-blue-300'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border shadow-inner" style={{ backgroundColor: col.hex }} />
                      <span className="truncate">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AKSESORIS & EKSPRESI WAJAH */}
          {activeTab === 'accessory' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Accessory */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  1. Aksesoris Juara:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {accessoryOptions.map((acc) => {
                    const isSelected = config.accessory === acc.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => handleUpdate({ accessory: acc.id as any }, `Memakai ${acc.label}!`)}
                        className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 text-left transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300 text-blue-900 font-black'
                            : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-2xl">{acc.icon}</span>
                        <span className="text-xs">{acc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expression */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-2.5">
                  2. Ekspresi Wajah Senang:
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {expressionOptions.map((exp) => {
                    const isSelected = config.expression === exp.id;
                    return (
                      <button
                        key={exp.id}
                        onClick={() => handleUpdate({ expression: exp.id as any })}
                        className={`p-3 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300 text-blue-900 font-black'
                            : 'bg-slate-50 border-slate-200 text-slate-700 font-bold'
                        }`}
                      >
                        <span className="text-2xl">{exp.icon}</span>
                        <span className="text-xs">{exp.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA to Save */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Check className="w-5 h-5" />
              <span>Simpan & Pakai Avatar Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
