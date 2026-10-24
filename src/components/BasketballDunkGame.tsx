import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, Award } from 'lucide-react';
import { NUMBERS_DATA, NumberItem } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BasketballDunkGameProps {
  onEarnStar: (amount: number) => void;
}

export const BasketballDunkGame: React.FC<BasketballDunkGameProps> = ({ onEarnStar }) => {
  const [targetNumber, setTargetNumber] = useState<NumberItem | null>(null);
  const [ballOptions, setBallOptions] = useState<NumberItem[]>([]);
  const [dunkState, setDunkState] = useState<'idle' | 'flying' | 'swish' | 'bounce-off'>('idle');
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const initRound = () => {
    const target = NUMBERS_DATA[Math.floor(Math.random() * NUMBERS_DATA.length)];
    const distractors = NUMBERS_DATA.filter((n) => n.number !== target.number)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const pool = [target, ...distractors].sort(() => 0.5 - Math.random());

    setTargetNumber(target);
    setBallOptions(pool);
    setDunkState('idle');
    setSelectedNum(null);

    sound.playPop();
    sound.speak(`Ayo dunk bola basket bernomor ${target.number} ke ring basket!`);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleShootBall = (item: NumberItem) => {
    if (dunkState !== 'idle' || !targetNumber) return;

    setSelectedNum(item.number);
    setDunkState('flying');
    sound.playPop();

    const isCorrect = item.number === targetNumber.number;

    setTimeout(() => {
      if (isCorrect) {
        sound.playFanfare();
        setDunkState('swish');
        setScore((prev) => prev + 2); // 2 points per basket!
        onEarnStar(1);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.4 }
        });
        sound.speak(`Swiiish! Slam dunk sempurna! Dua poin untuk nomor ${targetNumber.number}!`);

        setTimeout(() => {
          initRound();
        }, 1800);
      } else {
        sound.playWrong();
        setDunkState('bounce-off');
        sound.speak(`Bola memantul di ring! Cari bola bernomor ${targetNumber.number} ya!`);

        setTimeout(() => {
          setDunkState('idle');
          setSelectedNum(null);
        }, 1400);
      }
    }, 500);
  };

  const playPrompt = () => {
    if (targetNumber) {
      sound.speak(`Cari bola basket nomor ${targetNumber.number} (${targetNumber.word})!`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-orange-300 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-black uppercase mb-1">
            🏀 Mini Game Bola Basket
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Slam Dunk Angka Basket
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Pilih bola basket dengan nomor yang diminta dan masukkan ke dalam ring!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => sound.speakTouch(`Skor basket kamu saat ini: ${score} poin!`)}
            className="px-4 py-2 bg-orange-50 border-2 border-orange-300 rounded-2xl flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Ketuk untuk mendengar skor"
          >
            <span className="text-xl">🏀</span>
            <div className="text-left">
              <div className="text-[10px] font-bold text-orange-700">Skor Basket</div>
              <div className="text-lg font-black text-orange-950 font-display tabular-nums">
                {score} Pts
              </div>
            </div>
          </button>

          <button
            onClick={initRound}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all"
            title="Soal Baru"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Target Mission Callout */}
      {targetNumber && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl font-black font-display shadow-md">
              {targetNumber.number}
            </div>
            <div>
              <div className="text-xs font-bold text-orange-700">
                Target Dunk:
              </div>
              <div className="text-lg font-extrabold text-orange-950">
                Cari Bola Nomor "{targetNumber.number}" ({targetNumber.word})
              </div>
            </div>
          </div>

          <button
            onClick={playPrompt}
            className="px-4 py-2 bg-white hover:bg-orange-100 text-orange-800 font-bold text-xs rounded-xl shadow-xs border border-orange-300 flex items-center gap-1.5 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>Dengarkan Suara</span>
          </button>
        </div>
      )}

      {/* BASKETBALL COURT & HOOP STAGE */}
      <div className="relative h-[340px] sm:h-[380px] bg-gradient-to-b from-sky-400 via-amber-100 to-amber-200 rounded-3xl border-4 border-orange-400 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        {/* Basketball Backboard and Ring at the Top */}
        <div className="relative z-10 w-full flex flex-col items-center mt-2">
          {/* Backboard glass */}
          <div className="relative w-44 sm:w-56 h-28 bg-white/90 border-4 border-red-500 rounded-2xl shadow-xl flex flex-col items-center justify-center">
            {/* Inner square */}
            <div className="w-20 h-14 border-3 border-red-500 rounded-md" />

            {/* Hoop Rim and Net */}
            <div className="absolute -bottom-4 w-24 h-6 border-4 border-orange-600 rounded-full bg-orange-600/30 flex justify-center shadow-md">
              {/* Net strands */}
              <div className="w-20 h-12 border-x-2 border-b-2 border-white/80 rounded-b-xl bg-checker-pattern opacity-60" />
            </div>

            {dunkState === 'swish' && (
              <div className="absolute -top-3 bg-amber-400 text-blue-950 font-black text-xs px-3 py-1 rounded-full animate-bounce shadow-md">
                +2 POINTS! SWISH!
              </div>
            )}
          </div>
        </div>

        {/* Flying Basketball Animation */}
        {dunkState !== 'idle' && selectedNum !== null && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-500 text-6xl drop-shadow-xl ${
              dunkState === 'flying'
                ? 'top-40 scale-100'
                : dunkState === 'swish'
                ? 'top-20 scale-75 opacity-90'
                : 'top-32 translate-x-24 rotate-45 scale-90'
            }`}
          >
            🏀
          </div>
        )}

        {/* Basketball options at the bottom of the court */}
        <div className="relative z-20 flex flex-col items-center pb-2">
          <span className="text-xs font-black text-amber-950 bg-white/80 px-3 py-1 rounded-full mb-3 shadow-xs">
            Ketuk bola yang benar untuk memasukkannya ke ring:
          </span>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md">
            {ballOptions.map((item) => (
              <button
                key={item.number}
                onClick={() => handleShootBall(item)}
                disabled={dunkState !== 'idle'}
                className="group relative p-4 rounded-3xl bg-white/95 hover:bg-orange-100 border-3 border-orange-400 hover:border-orange-600 shadow-xl flex flex-col items-center justify-center gap-1 transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <div className="relative">
                  <span className="text-5xl sm:text-6xl group-hover:rotate-12 transition-transform inline-block">
                    🏀
                  </span>
                  {/* Number Badge Overlay on Ball */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-white font-display bg-black/60 px-2 py-0.5 rounded-full shadow-md">
                      {item.number}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-black text-slate-800 group-hover:text-orange-900 mt-1">
                  {item.word}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
