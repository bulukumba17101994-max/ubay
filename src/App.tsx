/**
 * Juara Cilik - Aplikasi Pembelajaran Anak TK
 * Mengenal Huruf A-Z, Sambung Huruf, Angka 1-100, dan Warna Dasar
 * Desain Lucu Sporty Anak Laki-Laki
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroHome } from './components/HeroHome';
import { AlphabetModule } from './components/AlphabetModule';
import { ConnectLettersModule } from './components/ConnectLettersModule';
import { NumbersModule } from './components/NumbersModule';
import { ColorsModule } from './components/ColorsModule';
import { MiniGamesHub } from './components/MiniGamesHub';
import { AvatarCustomizer } from './components/AvatarCustomizer';
import { TrophyRoom } from './components/TrophyRoom';
import { AvatarConfig, DEFAULT_AVATAR } from './types/avatar';
import { sound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Star and Reward Points
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('juara_cilik_stars');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  // Sporty Boy Avatar Configuration
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(() => {
    try {
      const saved = localStorage.getItem('juara_cilik_avatar');
      return saved ? JSON.parse(saved) : DEFAULT_AVATAR;
    } catch {
      return DEFAULT_AVATAR;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('juara_cilik_stars', stars.toString());
    } catch {
      // ignore
    }
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem('juara_cilik_avatar', JSON.stringify(avatarConfig));
    } catch {
      // ignore
    }
  }, [avatarConfig]);

  const handleEarnStar = (amount: number = 1) => {
    setStars((prev) => prev + amount);
  };

  const handleResetStars = () => {
    setStars(0);
  };

  const handleSaveAvatar = (newConfig: AvatarConfig) => {
    setAvatarConfig(newConfig);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-300 selection:text-blue-950">
      {/* Top Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        stars={stars}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        avatarConfig={avatarConfig}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-1">
        {currentTab === 'home' && (
          <HeroHome
            onSelectTab={handleSelectTab}
            stars={stars}
            avatarConfig={avatarConfig}
          />
        )}

        {currentTab === 'letters' && (
          <AlphabetModule onEarnStar={handleEarnStar} />
        )}

        {currentTab === 'connect' && (
          <ConnectLettersModule onEarnStar={handleEarnStar} />
        )}

        {currentTab === 'numbers' && (
          <NumbersModule onEarnStar={handleEarnStar} />
        )}

        {currentTab === 'colors' && (
          <ColorsModule onEarnStar={handleEarnStar} />
        )}

        {currentTab === 'minigames' && (
          <MiniGamesHub onEarnStar={handleEarnStar} />
        )}

        {currentTab === 'avatar' && (
          <AvatarCustomizer
            currentConfig={avatarConfig}
            onSaveAvatar={handleSaveAvatar}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'trophy' && (
          <TrophyRoom
            stars={stars}
            onResetStars={handleResetStars}
            onSelectTab={handleSelectTab}
            avatarConfig={avatarConfig}
            onEarnStar={handleEarnStar}
          />
        )}
      </main>

      {/* Quiet Clean Anti-Slop Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-900 font-display text-sm">
              Juara Cilik TK
            </span>
            <span>·</span>
            <span>Edukasi Huruf A-Z, Sambung Huruf, Angka 1-100 & Warna</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleSelectTab('letters')}
              className="hover:text-blue-600 transition-colors"
            >
              Huruf A-Z
            </button>
            <button
              onClick={() => handleSelectTab('connect')}
              className="hover:text-indigo-600 transition-colors font-bold text-indigo-600"
            >
              Sambung Huruf 🔤
            </button>
            <button
              onClick={() => handleSelectTab('numbers')}
              className="hover:text-orange-600 transition-colors font-bold text-orange-600"
            >
              Angka 1-100 💯
            </button>
            <button
              onClick={() => handleSelectTab('colors')}
              className="hover:text-emerald-600 transition-colors"
            >
              Warna Juara
            </button>
            <button
              onClick={() => handleSelectTab('minigames')}
              className="hover:text-purple-600 transition-colors"
            >
              Mini Games 🎮
            </button>
            <button
              onClick={() => handleSelectTab('avatar')}
              className="hover:text-cyan-600 transition-colors"
            >
              Avatar 👕
            </button>
            <button
              onClick={() => handleSelectTab('trophy')}
              className="hover:text-amber-600 transition-colors"
            >
              Hadiah ⭐
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
