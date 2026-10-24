import React, { useState } from 'react';
import { PenaltyKickGame } from './PenaltyKickGame';
import { BasketballDunkGame } from './BasketballDunkGame';
import { ColorTrackGame } from './ColorTrackGame';
import { RaceQuizModule } from './RaceQuizModule';
import { sound } from '../utils/audio';

interface MiniGamesHubProps {
  onEarnStar: (amount: number) => void;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({ onEarnStar }) => {
  const [activeGame, setActiveGame] = useState<'penalty' | 'basketball' | 'color-track' | 'grand-prix'>('penalty');

  const games = [
    {
      id: 'penalty' as const,
      title: 'Tendang Penalti',
      subtitle: 'Tebak Huruf A-Z',
      icon: '⚽',
      color: 'bg-emerald-600',
      tag: 'Sepak Bola'
    },
    {
      id: 'basketball' as const,
      title: 'Slam Dunk Basket',
      subtitle: 'Tebak Angka 1-10',
      icon: '🏀',
      color: 'bg-orange-500',
      tag: 'Bola Basket'
    },
    {
      id: 'color-track' as const,
      title: 'Lintasan Warna',
      subtitle: 'Pilih Jalur Mobil',
      icon: '🏎️',
      color: 'bg-cyan-600',
      tag: 'Balap Mobil'
    },
    {
      id: 'grand-prix' as const,
      title: 'Grand Prix Kuis',
      subtitle: 'Tantangan Lengkap',
      icon: '🏆',
      color: 'bg-red-600',
      tag: 'Podium 1'
    }
  ];

  const handleSwitchGame = (id: typeof activeGame) => {
    setActiveGame(id);
    const speechNames: Record<typeof activeGame, string> = {
      penalty: 'Permainan Tendang Penalti Huruf!',
      basketball: 'Permainan Slam Dunk Angka Basket!',
      'color-track': 'Permainan Lintasan Mobil Turbo Warna!',
      'grand-prix': 'Permainan Balapan Kuis Grand Prix!'
    };
    sound.speakTouch(speechNames[id]);
  };

  return (
    <div className="space-y-6">
      {/* Game Selector Tab Strip */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border-3 border-blue-200 shadow-md">
        <div className="flex items-center justify-between mb-3 px-2">
          <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <span>Pilih Arena Mini Game:</span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-bold">
              4 Permainan Seru
            </span>
          </h4>
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Menangkan bintang di setiap game!
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {games.map((g) => {
            const isActive = activeGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleSwitchGame(g.id)}
                className={`p-3 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
                  isActive
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300 shadow-md font-black'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:scale-102 font-bold'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl text-white flex items-center justify-center text-2xl shadow-sm ${g.color}`}>
                  {g.icon}
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-900 font-black truncate">
                    {g.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    {g.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Game */}
      <div>
        {activeGame === 'penalty' && <PenaltyKickGame onEarnStar={onEarnStar} />}
        {activeGame === 'basketball' && <BasketballDunkGame onEarnStar={onEarnStar} />}
        {activeGame === 'color-track' && <ColorTrackGame onEarnStar={onEarnStar} />}
        {activeGame === 'grand-prix' && <RaceQuizModule onEarnStar={onEarnStar} />}
      </div>
    </div>
  );
};
