import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { AvatarConfig } from '../types/avatar';
import { SportyAvatar } from './SportyAvatar';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  avatarConfig: AvatarConfig;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  stars,
  isMuted,
  onToggleMute,
  avatarConfig
}) => {
  const navItems = [
    { id: 'home', label: 'Arena Utama' },
    { id: 'letters', label: 'Huruf A-Z' },
    { id: 'connect', label: 'Sambung Huruf 🔤' },
    { id: 'numbers', label: 'Angka 1-100 💯' },
    { id: 'colors', label: 'Warna Juara' },
    { id: 'minigames', label: 'Mini Games 🎮' },
    { id: 'avatar', label: 'Avatar Sporty 👕' },
    { id: 'trophy', label: 'Hadiah 🏆' }
  ];

  const handleNavClick = (id: string, label: string) => {
    onSelectTab(id);
    const speechMap: Record<string, string> = {
      home: 'Arena Utama Juara!',
      letters: 'Belajar Huruf A sampai Z!',
      connect: 'Belajar Sambung Huruf dan Suku Kata!',
      numbers: 'Belajar Angka satu sampai seratus!',
      colors: 'Belajar Warna Tim Juara!',
      minigames: 'Arena Mini Games Olahraga!',
      avatar: 'Ruang Ganti Avatar Sporty!',
      trophy: 'Koleksi Trofi dan Stiker Juara!'
    };
    sound.speakTouch(speechMap[id] || label);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-blue-200 shadow-sm transition-all">
      {/* Top sporty racing stripe accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-amber-400 to-red-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand title, single line */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform">
            <span className="text-xl">🏆</span>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-blue-900 font-display flex items-center gap-1.5">
              Juara Cilik
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold tracking-normal">
                TK SPORTY
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Belajar Huruf, Angka & Warna
            </p>
          </div>
        </button>

        {/* Zone 2: Navigation Links, single line */}
        <nav className="hidden 2xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md scale-102'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Avatar Preview & Star Counter & Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Avatar Profile Button */}
          <button
            onClick={() => onSelectTab('avatar')}
            title="Kustomisasi Avatar Sporty Kamu"
            className={`flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-2xl border-2 transition-all hover:scale-105 ${
              currentTab === 'avatar'
                ? 'bg-blue-50 border-blue-500 shadow-sm'
                : 'bg-slate-50 hover:bg-blue-50 border-slate-200'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-blue-100 overflow-hidden flex items-center justify-center border border-blue-300">
              <SportyAvatar config={avatarConfig} size={30} showBody={false} />
            </div>
            <span className="text-xs font-black text-slate-800 hidden sm:inline">
              #{avatarConfig.jerseyNumber}
            </span>
          </button>

          {/* Star counter display */}
          <button
            onClick={() => onSelectTab('trophy')}
            title="Lihat Bintang & Koleksi Trofi"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-xl transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="text-amber-900 font-extrabold text-sm font-display tabular-nums">
              {stars}
            </span>
            <span className="text-xs font-semibold text-amber-700 hidden sm:inline">
              ⭐
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className={`p-2 rounded-xl border-2 transition-all ${
              isMuted
                ? 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100'
                : 'bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Horizontal Nav Bar */}
      <div className="2xl:hidden flex items-center justify-start gap-1 px-3 py-1.5 bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.label)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
