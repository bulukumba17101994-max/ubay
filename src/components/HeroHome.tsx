import React from 'react';
import { Sparkles, Trophy, ChevronRight, Play, Volume2, Award, Zap, User, Link2 } from 'lucide-react';
import { AvatarConfig } from '../types/avatar';
import { SportyAvatar } from './SportyAvatar';
import { sound } from '../utils/audio';

interface HeroHomeProps {
  onSelectTab: (tab: string) => void;
  stars: number;
  avatarConfig: AvatarConfig;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onSelectTab, stars, avatarConfig }) => {
  const handleSoundboard = (type: 'whistle' | 'rev' | 'fanfare' | 'chime') => {
    switch (type) {
      case 'whistle':
        sound.playWhistle();
        sound.speak('Priiiit! Peluit wasit!');
        break;
      case 'rev':
        sound.playEngineRev();
        sound.speak('Vroooom! Suara mesin balap!');
        break;
      case 'fanfare':
        sound.playFanfare();
        sound.speak('Horeee! Tepuk tangan juara!');
        break;
      case 'chime':
        sound.playCorrect();
        sound.speak('Ting tong! Suara lonceng piala!');
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* HERO SECTION WITH GENERATED 3D BOY CHAMPION ASSET + USER AVATAR */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 p-6 sm:p-10 text-white shadow-2xl overflow-hidden border-4 border-blue-400/40">
        <div className="absolute inset-0 bg-track-lines opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black text-amber-300 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Aplikasi Edukasi Interaktif Anak TK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Halo Atlet #{avatarConfig.jerseyNumber}! <br />
              <span className="text-amber-300 underline decoration-red-500">
                Ayo Belajar & Raih Piala!
              </span>
            </h1>

            <p className="text-blue-100 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
              Selamat datang di arena belajar paling seru! Kenali <strong>huruf A-Z</strong>, rangkai <strong>sambung huruf</strong>, hitung <strong>angka 1-100</strong>, dan temukan <strong>warna cerah</strong>!
            </p>

            {/* Quick CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sound.playPop();
                  onSelectTab('connect');
                }}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-amber-400/40 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                <span>Mulai Sambung Huruf</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onSelectTab('numbers');
                }}
                className="px-5 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <span>🔢 Angka 1-100</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onSelectTab('minigames');
                }}
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <span>🎮 Mini Games</span>
              </button>
            </div>

            {/* Star & Avatar Milestone Banner */}
            <div className="pt-2 flex items-center gap-3 text-xs font-bold text-blue-200">
              <div className="flex items-center gap-1 text-amber-300">
                <Trophy className="w-4 h-4" />
                <span>Bintang Kamu: {stars} ⭐</span>
              </div>
              <span>·</span>
              <span>Nomor Jersey #{avatarConfig.jerseyNumber}</span>
            </div>
          </div>

          {/* Right Image Visual Showcase with Mascot + User Avatar Corner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/40 shadow-2xl bg-blue-900 group">
              <img
                src="/src/assets/images/sporty_kids_hero_1792835517539.jpg"
                alt="Boni si Juara Cilik dan Mobil Balap Turbo di Stadion"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Floating mascot bubble badge with Child's Custom Avatar */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg text-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-300 shrink-0">
                    <SportyAvatar config={avatarConfig} size={46} showBody={false} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-blue-900 flex items-center gap-1">
                      <span>Avatar Kamu: #{avatarConfig.jerseyNumber}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600">
                      "Siap sambung huruf dan hitung sampai 100!"
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTab('avatar')}
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-black shrink-0 transition-all active:scale-95"
                >
                  Ubah
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEARNING MODULE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Module 1: Huruf A-Z */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectTab('letters');
          }}
          className="group bg-white rounded-3xl p-6 border-3 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border-2 border-blue-200 flex items-center justify-center text-3xl font-black font-display group-hover:scale-110 transition-transform">
                🔤
              </div>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-[11px] font-black">
                26 Huruf
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-blue-600 transition-colors">
              Mengenal Huruf A-Z
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Belajar bunyi huruf alfabet, kata benda olahraga, dan tebalkan garis di papan coret!
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-blue-600 font-extrabold text-xs">
            <span>Buka Huruf A-Z</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Module 2: Sambung Huruf (BARU!) */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectTab('connect');
          }}
          className="group bg-white rounded-3xl p-6 border-3 border-indigo-300 hover:border-indigo-600 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-black px-3 py-0.5 rounded-bl-xl shadow-xs">
            BARU!
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border-2 border-indigo-200 flex items-center justify-center text-3xl font-black font-display group-hover:scale-110 transition-transform">
                🧩
              </div>
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-[11px] font-black">
                Eja & Titik
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-indigo-600 transition-colors">
              Sambung Huruf
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Rangkai huruf menjadi kata BOLA, MOBIL, HELM, serta hubungkan titik huruf A-Z!
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-extrabold text-xs">
            <span>Mulai Sambung Huruf</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Module 3: Angka 1-100 */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectTab('numbers');
          }}
          className="group bg-white rounded-3xl p-6 border-3 border-orange-200 hover:border-orange-500 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 border-2 border-orange-200 flex items-center justify-center text-3xl font-black font-display group-hover:scale-110 transition-transform">
                💯
              </div>
              <span className="px-2.5 py-1 bg-orange-100 text-orange-800 rounded-lg text-[11px] font-black">
                1 sampai 100
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-orange-600 transition-colors">
              Mengenal Angka 1-100
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Papan 100 angka lengkap, ejaan puluhan & ratusan, berhitung tap benda, dan pola lompat!
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-orange-600 font-extrabold text-xs">
            <span>Buka Papan 100</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Module 4: Warna Dasar */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectTab('colors');
          }}
          className="group bg-white rounded-3xl p-6 border-3 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center text-3xl font-black font-display group-hover:scale-110 transition-transform">
                🎨
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-black">
                Warna Tim
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-emerald-600 transition-colors">
              Mengenal Warna Juara
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Kenali aneka warna dasar, semprot cat mobil balap sesukamu, dan campurkan warna ajaib!
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-emerald-600 font-extrabold text-xs">
            <span>Buka Arena Warna</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* QUICK SOUNDBOARD ARENA */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-600" />
            <h4 className="font-black text-slate-900 text-base">
              Papan Suara Sporty (Soundboard Anak)
            </h4>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Ketuk tombol untuk mendengar suara seru!
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleSoundboard('whistle')}
            className="p-3.5 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-700 font-black rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="text-2xl">📢</span>
            <span>Peluit Wasit</span>
          </button>

          <button
            onClick={() => handleSoundboard('rev')}
            className="p-3.5 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 text-orange-700 font-black rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="text-2xl">🏎️</span>
            <span>Mesin Turbo Vroom</span>
          </button>

          <button
            onClick={() => handleSoundboard('fanfare')}
            className="p-3.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-800 font-black rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="text-2xl">🎺</span>
            <span>Terompet Kemenangan</span>
          </button>

          <button
            onClick={() => handleSoundboard('chime')}
            className="p-3.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 font-black rounded-2xl text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="text-2xl">✨</span>
            <span>Lonceng Juara</span>
          </button>
        </div>
      </div>
    </div>
  );
};
