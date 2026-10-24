import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { LETTERS_DATA, LetterItem } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PenaltyKickGameProps {
  onEarnStar: (amount: number) => void;
}

export const PenaltyKickGame: React.FC<PenaltyKickGameProps> = ({ onEarnStar }) => {
  const [targetLetter, setTargetLetter] = useState<LetterItem | null>(null);
  const [goalOptions, setGoalOptions] = useState<{ id: string; letter: LetterItem; pos: 'top-left' | 'center' | 'top-right' }[]>([]);
  const [ballState, setBallState] = useState<'ready' | 'kicking' | 'goal' | 'miss'>('ready');
  const [score, setScore] = useState(0);
  const [kickedTarget, setKickedTarget] = useState<string | null>(null);

  const initRound = () => {
    const target = LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)];
    const distractors = LETTERS_DATA.filter((l) => l.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const pool = [target, ...distractors].sort(() => 0.5 - Math.random());
    const positions: ('top-left' | 'center' | 'top-right')[] = ['top-left', 'center', 'top-right'];

    setTargetLetter(target);
    setGoalOptions([
      { id: '1', letter: pool[0], pos: positions[0] },
      { id: '2', letter: pool[1], pos: positions[1] },
      { id: '3', letter: pool[2], pos: positions[2] }
    ]);
    setBallState('ready');
    setKickedTarget(null);

    sound.playWhistle();
    sound.speak(`Ayo tendang bola ke gawang huruf ${target.char} untuk ${target.word}!`);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleShoot = (option: { id: string; letter: LetterItem; pos: string }) => {
    if (ballState !== 'ready' || !targetLetter) return;

    setKickedTarget(option.pos);
    setBallState('kicking');
    sound.playPop();

    const isGoal = option.letter.id === targetLetter.id;

    setTimeout(() => {
      if (isGoal) {
        sound.playFanfare();
        setBallState('goal');
        setScore((prev) => prev + 1);
        onEarnStar(1);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.5 }
        });
        sound.speak(`Gooooool! Tendangan hebat ke huruf ${targetLetter.char} untuk ${targetLetter.word}!`);

        setTimeout(() => {
          initRound();
        }, 2000);
      } else {
        sound.playWrong();
        setBallState('miss');
        sound.speak(`Kiper berhasil menepis! Ayo coba lagi cari huruf ${targetLetter.char}!`);

        setTimeout(() => {
          setBallState('ready');
        }, 1500);
      }
    }, 600);
  };

  const playVoiceCue = () => {
    if (targetLetter) {
      sound.speak(`Tendang ke huruf ${targetLetter.char} untuk ${targetLetter.word}!`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 shadow-xl space-y-6">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase mb-1">
            ⚽ Mini Game Sepak Bola
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Tendang Penalti Huruf Juara
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Arahkan tendanganmu ke gawang yang memiliki huruf yang tepat!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => sound.speakTouch(`Skor kamu saat ini: ${score} Gol!`)}
            className="px-4 py-2 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Ketuk untuk mendengar skor"
          >
            <span className="text-xl">🥅</span>
            <div className="text-left">
              <div className="text-[10px] font-bold text-emerald-700">Skor Gol</div>
              <div className="text-lg font-black text-emerald-950 font-display tabular-nums">
                {score} Gol
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
      {targetLetter && (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl font-black font-display shadow-md">
              {targetLetter.char}
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700">
                Target Tendangan Penalti:
              </div>
              <div className="text-lg font-extrabold text-emerald-950">
                Cari Huruf "{targetLetter.char}" ({targetLetter.word} {targetLetter.emoji})
              </div>
            </div>
          </div>

          <button
            onClick={playVoiceCue}
            className="px-4 py-2 bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl shadow-xs border border-emerald-300 flex items-center gap-1.5 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Dengarkan Suara</span>
          </button>
        </div>
      )}

      {/* SOCCER STADIUM & GOALPOST STAGE */}
      <div className="relative h-[320px] sm:h-[360px] bg-gradient-to-b from-sky-300 via-emerald-600 to-emerald-700 rounded-3xl border-4 border-emerald-500 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        {/* Stadium Spectator Stands Background */}
        <div className="absolute top-0 inset-x-0 h-16 bg-slate-800/40 backdrop-blur-xs flex items-center justify-around px-4 opacity-50 pointer-events-none">
          <div className="text-xs text-white font-bold flex gap-4">
            <span>🔴 SUPORTER TIM A</span>
            <span>🏆 JUARA CILIK CUP</span>
            <span>🔵 SUPORTER TIM B</span>
          </div>
        </div>

        {/* Goalpost Structure */}
        <div className="relative z-10 w-full max-w-xl mx-auto h-[200px] border-8 border-white rounded-t-3xl bg-white/10 backdrop-blur-xs shadow-2xl mt-8 flex flex-col justify-between p-3">
          {/* Net Grid pattern */}
          <div className="absolute inset-0 bg-checker-pattern opacity-25 pointer-events-none" />

          {/* Letter Target Banners inside Goal */}
          <div className="relative z-20 grid grid-cols-3 gap-3 h-full items-center">
            {goalOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleShoot(opt)}
                disabled={ballState !== 'ready'}
                className="group h-28 rounded-2xl bg-white/90 hover:bg-yellow-300 border-3 border-emerald-400 hover:border-yellow-500 shadow-lg flex flex-col items-center justify-center gap-1 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-4xl sm:text-5xl font-black text-blue-900 group-hover:text-slate-900 font-display">
                  {opt.letter.char}
                </span>
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">
                  {opt.letter.word}
                </span>
                <span className="text-xl">{opt.letter.emoji}</span>
              </button>
            ))}
          </div>

          {/* Goalkeeper Mascot on the line */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-15 pointer-events-none transition-all duration-300">
            <div className="text-4xl sm:text-5xl animate-bounce">
              🧤👦
            </div>
          </div>
        </div>

        {/* Soccer Ball at the Penalty Spot */}
        <div className="relative z-20 flex flex-col items-center">
          {/* Penalty Spot Mark */}
          <div className="w-12 h-3 bg-white/60 rounded-full mb-1" />

          {/* Ball with CSS kick flight animation */}
          <div
            className={`text-5xl sm:text-6xl transition-all duration-500 cursor-pointer ${
              ballState === 'kicking'
                ? 'scale-50 -translate-y-36 opacity-90'
                : ballState === 'goal'
                ? 'scale-40 -translate-y-44 filter drop-shadow-2xl'
                : 'hover:scale-110 active:scale-90 animate-soft-bounce'
            }`}
          >
            ⚽
          </div>
        </div>

        {/* Goal celebration banner */}
        {ballState === 'goal' && (
          <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 text-center border-4 border-amber-400 shadow-2xl animate-bounce space-y-2">
              <div className="text-5xl">🎉 GOL JUARA! 🎉</div>
              <h4 className="text-2xl font-black text-emerald-700 font-display">
                Tendangan Sempurna! (+1 Bintang ⭐)
              </h4>
              <p className="text-xs font-bold text-slate-500">
                Bersiap untuk tendangan penalti berikutnya...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
