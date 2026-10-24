import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, Award, Zap } from 'lucide-react';
import { COLORS_DATA, ColorItem } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ColorTrackGameProps {
  onEarnStar: (amount: number) => void;
}

export const ColorTrackGame: React.FC<ColorTrackGameProps> = ({ onEarnStar }) => {
  const [targetColor, setTargetColor] = useState<ColorItem | null>(null);
  const [laneOptions, setLaneOptions] = useState<ColorItem[]>([]);
  const [carLaneIndex, setCarLaneIndex] = useState<number>(1); // 0, 1, 2
  const [isSpeeding, setIsSpeeding] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const initRound = () => {
    // Pick 3 distinct colors
    const shuffled = [...COLORS_DATA].sort(() => 0.5 - Math.random());
    const lanes = shuffled.slice(0, 3);
    const target = lanes[Math.floor(Math.random() * lanes.length)];

    setLaneOptions(lanes);
    setTargetColor(target);
    setIsSpeeding(false);

    sound.playEngineRev();
    sound.speak(`Arahkan mobil turbo ke jalur warna ${target.name}! ${target.teamName}!`);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleSelectLane = (idx: number, item: ColorItem) => {
    if (isSpeeding || !targetColor) return;

    setCarLaneIndex(idx);
    sound.playPop();

    if (item.id === targetColor.id) {
      setIsSpeeding(true);
      sound.playEngineRev();
      sound.playCorrect();
      setScore((prev) => prev + 1);
      onEarnStar(1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
      sound.speak(`Vroooom! Hebat sekali! Mobil melesat di jalur warna ${targetColor.name}!`);

      setTimeout(() => {
        initRound();
      }, 1800);
    } else {
      sound.playWrong();
      sound.speak(`Itu jalur warna ${item.name}! Ayo cari jalur warna ${targetColor.name} ya!`);
    }
  };

  const playPrompt = () => {
    if (targetColor) {
      sound.speak(`Cari jalur warna ${targetColor.name} (${targetColor.teamName})!`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-cyan-300 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-black uppercase mb-1">
            🏎️ Mini Game Balap Mobil
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Lintasan Turbo Warna Juara
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Pindahkan mobil balap ke lajur sirkuit dengan warna yang diminta!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => sound.speakTouch(`Skor sirkuit kamu saat ini: ${score} tikungan selesai!`)}
            className="px-4 py-2 bg-cyan-50 border-2 border-cyan-300 rounded-2xl flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Ketuk untuk mendengar skor"
          >
            <span className="text-xl">🏁</span>
            <div className="text-left">
              <div className="text-[10px] font-bold text-cyan-700">Skor Tikungan</div>
              <div className="text-lg font-black text-cyan-950 font-display tabular-nums">
                {score} Selesai
              </div>
            </div>
          </button>

          <button
            onClick={initRound}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all"
            title="Lajur Baru"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Target Mission Callout */}
      {targetColor && (
        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md font-black text-xl border-2 border-white"
              style={{ backgroundColor: targetColor.hex, color: targetColor.contrastText }}
            >
              🎨
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-700">
                Lajur Target Balapan:
              </div>
              <div className="text-lg font-extrabold text-cyan-950">
                Pilih Jalur Warna "{targetColor.name}" ({targetColor.teamName})
              </div>
            </div>
          </div>

          <button
            onClick={playPrompt}
            className="px-4 py-2 bg-white hover:bg-cyan-100 text-cyan-800 font-bold text-xs rounded-xl shadow-xs border border-cyan-300 flex items-center gap-1.5 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-cyan-600" />
            <span>Dengarkan Suara</span>
          </button>
        </div>
      )}

      {/* 3-LANE COLOR RACING HIGHWAY */}
      <div className="relative h-[340px] sm:h-[380px] bg-slate-900 rounded-3xl border-4 border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-2xl">
        {/* Speed Track Lines */}
        <div className="absolute inset-0 bg-track-lines opacity-30 pointer-events-none" />

        {/* Finish / Checkpoint Line at top */}
        <div className="relative z-10 w-full h-8 bg-checker-pattern border-y-2 border-white flex items-center justify-center">
          <span className="bg-white/95 px-3 py-0.5 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-md">
            GARIS FINISH CHECKPOINT
          </span>
        </div>

        {/* 3 Color Lanes Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 h-[200px] w-full max-w-lg mx-auto">
          {laneOptions.map((lane, idx) => (
            <div
              key={lane.id}
              className="relative rounded-2xl border-2 border-white/30 flex flex-col items-center justify-between p-2 shadow-inner transition-all overflow-hidden"
              style={{ backgroundColor: `${lane.hex}33` }} // 20% opacity tint
            >
              {/* Lane Header Banner */}
              <div
                className="w-full py-1.5 px-1 rounded-xl text-center shadow-md font-black text-xs border border-white/40"
                style={{ backgroundColor: lane.hex, color: lane.contrastText }}
              >
                {lane.name}
              </div>

              {/* Lane items visual cue */}
              <div className="text-3xl my-auto opacity-70">
                {lane.exampleItems[0]?.emoji || '🏁'}
              </div>

              {/* Lane Tap Action Button */}
              <button
                onClick={() => handleSelectLane(idx, lane)}
                disabled={isSpeeding}
                className="w-full py-2 bg-white/90 hover:bg-white text-slate-900 font-black text-xs rounded-xl shadow-md border-2 border-white hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Pilih Jalur</span>
              </button>
            </div>
          ))}

          {/* Animated Race Car moving between lanes */}
          <div
            className={`absolute bottom-4 transition-all duration-500 z-20 flex flex-col items-center ${
              isSpeeding ? '-translate-y-36 scale-90' : 'hover:scale-105'
            }`}
            style={{
              left: `calc(${carLaneIndex * 33.33}% + 16.66% - 28px)`
            }}
          >
            <div className="text-5xl sm:text-6xl drop-shadow-2xl">
              🏎️
            </div>
            {isSpeeding && (
              <div className="text-2xl -mt-2 animate-pulse">
                🔥💨
              </div>
            )}
          </div>
        </div>

        {/* Bottom instructions */}
        <div className="text-center text-xs font-bold text-slate-400 z-10">
          Ketuk tombol "Pilih Jalur" di bawah warna yang sesuai instruksi!
        </div>
      </div>
    </div>
  );
};
