import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Award, Sparkles, CheckCircle2, RotateCcw, Grid, Hash, Zap } from 'lucide-react';
import { getIndonesianNumberWord, getSportThemeDescription, getSportEmojiForNumber } from '../utils/numberWords';
import { TracingCanvas } from './TracingCanvas';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface NumbersModuleProps {
  onEarnStar: (amount: number) => void;
}

export const NumbersModule: React.FC<NumbersModuleProps> = ({ onEarnStar }) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [rangeFilter, setRangeFilter] = useState<'1-10' | '11-20' | '21-50' | '51-100' | 'all-100'>('1-10');
  const [skipCountFilter, setSkipCountFilter] = useState<'none' | '2' | '5' | '10'>('none');
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [hasCompletedCounting, setHasCompletedCounting] = useState(false);
  const [gameMode, setGameMode] = useState(false);

  // Game state (1 to 100)
  const [gameTarget, setGameTarget] = useState<number>(1);
  const [gameOptions, setGameOptions] = useState<number[]>([]);
  const [gameFeedback, setGameFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const { objectName, emoji } = getSportThemeDescription(selectedNumber);
  const wordIndonesian = getIndonesianNumberWord(selectedNumber);

  const handleSelectNumber = (num: number) => {
    sound.playPop();
    setSelectedNumber(num);
    setTappedIndices([]);
    setHasCompletedCounting(false);
    const word = getIndonesianNumberWord(num);
    sound.speak(`Angka ${num}. ${word}!`);
  };

  const handlePrev = () => {
    sound.playPop();
    const prev = selectedNumber <= 1 ? 100 : selectedNumber - 1;
    handleSelectNumber(prev);
  };

  const handleNext = () => {
    sound.playPop();
    const next = selectedNumber >= 100 ? 1 : selectedNumber + 1;
    handleSelectNumber(next);
  };

  const playSpeech = () => {
    sound.playPop();
    sound.speak(`Angka ${selectedNumber}. ${wordIndonesian}. ${objectName}!`);
  };

  // Tap-to-count items for numbers up to 20
  const maxTapItems = Math.min(selectedNumber, 20);

  const handleTapItem = (idx: number) => {
    if (tappedIndices.includes(idx)) {
      sound.playPop();
      return;
    }

    const newTapped = [...tappedIndices, idx];
    setTappedIndices(newTapped);
    sound.playPop();

    const currentCount = newTapped.length;
    sound.speak(`${getIndonesianNumberWord(currentCount)}!`);

    if (currentCount === maxTapItems && !hasCompletedCounting) {
      setHasCompletedCounting(true);
      setTimeout(() => {
        sound.playFanfare();
        sound.speak(`Horeee! Selesai menghitung ${maxTapItems} benda! Kamu pintar!`);
        onEarnStar(1);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 400);
    }
  };

  // Start "Tebak Angka 1-100" Quiz Game
  const startGame = () => {
    sound.playWhistle();
    // Choose target based on current filter or any 1-100
    let max = 100;
    let min = 1;
    if (rangeFilter === '1-10') { min = 1; max = 10; }
    else if (rangeFilter === '11-20') { min = 11; max = 20; }
    else if (rangeFilter === '21-50') { min = 21; max = 50; }

    const target = Math.floor(Math.random() * (max - min + 1)) + min;
    const distractors = [1, 2, 3, 4, 5]
      .map(() => Math.floor(Math.random() * (max - min + 1)) + min)
      .filter((n) => n !== target)
      .slice(0, 3);

    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setGameTarget(target);
    setGameOptions(options);
    setGameFeedback('idle');
    setGameMode(true);

    sound.speak(`Tebak ya, yang mana angka ${target} (${getIndonesianNumberWord(target)})?`);
  };

  const checkGameAnswer = (val: number) => {
    if (val === gameTarget) {
      sound.playCorrect();
      setGameFeedback('correct');
      onEarnStar(1);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      sound.speak(`Tepat sekali! Angka ${gameTarget} yaitu ${getIndonesianNumberWord(gameTarget)}!`);
      setTimeout(() => {
        startGame();
      }, 1600);
    } else {
      sound.playWrong();
      setGameFeedback('wrong');
      sound.speak(`Ayo cari angka ${gameTarget} (${getIndonesianNumberWord(gameTarget)})!`);
    }
  };

  // Generate numbers list based on range filter and skip-counting
  const getFilteredNumbers = () => {
    let start = 1;
    let end = 100;

    if (rangeFilter === '1-10') { start = 1; end = 10; }
    else if (rangeFilter === '11-20') { start = 11; end = 20; }
    else if (rangeFilter === '21-50') { start = 21; end = 50; }
    else if (rangeFilter === '51-100') { start = 51; end = 100; }
    else if (rangeFilter === 'all-100') { start = 1; end = 100; }

    const arr: number[] = [];
    for (let i = start; i <= end; i++) {
      if (skipCountFilter === '2' && i % 2 !== 0) continue;
      if (skipCountFilter === '5' && i % 5 !== 0) continue;
      if (skipCountFilter === '10' && i % 10 !== 0) continue;
      arr.push(i);
    }
    return arr;
  };

  const displayedNumbers = getFilteredNumbers();

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          💯
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-200 mb-2">
              <Award className="w-3.5 h-3.5" />
              Sirkuit Berhitung Lengkap 1 sampai 100
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Mengenal Angka 1 sampai 100
            </h2>
            <p className="text-orange-100 text-sm font-medium mt-1 max-w-xl">
              Belajar angka dasar 1-10, belasan, puluhan, hingga seratus dengan suara ejaan dan papan 100 juara!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (gameMode) {
                  setGameMode(false);
                  sound.playPop();
                } else {
                  startGame();
                }
              }}
              className="px-5 py-2.5 bg-white hover:bg-yellow-50 text-orange-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-orange-600" />
              {gameMode ? 'Kembali Belajar' : 'Tebak Angka 1-100'}
            </button>
          </div>
        </div>
      </div>

      {/* RANGE & SKIP COUNT SELECTOR STRIP */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-orange-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Range Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-black text-slate-500 mr-1 whitespace-nowrap">Rentang:</span>
          {[
            { id: '1-10', label: '1 - 10' },
            { id: '11-20', label: '11 - 20' },
            { id: '21-50', label: '21 - 50' },
            { id: '51-100', label: '51 - 100' },
            { id: 'all-100', label: 'Papan 100' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setRangeFilter(tab.id as any);
                sound.playPop();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 ${
                rangeFilter === tab.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skip Count Options */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-black text-slate-500 mr-1 whitespace-nowrap">Pola Lompat:</span>
          {[
            { id: 'none', label: 'Semua (1)' },
            { id: '2', label: 'Lompat 2' },
            { id: '5', label: 'Lompat 5' },
            { id: '10', label: 'Lompat 10' }
          ].map((skip) => (
            <button
              key={skip.id}
              onClick={() => {
                setSkipCountFilter(skip.id as any);
                sound.playPop();
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                skipCountFilter === skip.id
                  ? 'bg-blue-600 text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
              }`}
            >
              {skip.label}
            </button>
          ))}
        </div>
      </div>

      {gameMode ? (
        /* GAME MODE: TEBAK ANGKA 1-100 */
        <div className="bg-orange-50 border-3 border-orange-300 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-md">
          <div className="max-w-md mx-auto space-y-2">
            <div className="inline-block px-4 py-1.5 bg-orange-200 text-orange-900 rounded-full text-xs font-extrabold uppercase tracking-wider">
              Tantangan Angka Juara
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Manakah Angka{' '}
              <span className="text-orange-600 font-black underline">
                "{getIndonesianNumberWord(gameTarget)}"
              </span>
              ?
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Dengarkan ejaan kata di atas dan pilih kotak angka yang benar!
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
            {gameOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => checkGameAnswer(opt)}
                className="p-5 bg-white hover:bg-orange-100 border-3 border-orange-300 hover:border-orange-500 rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <span className="text-4xl sm:text-5xl font-black text-orange-700 font-display">
                  {opt}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {getIndonesianNumberWord(opt)}
                </span>
              </button>
            ))}
          </div>

          {gameFeedback === 'correct' && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-extrabold rounded-2xl text-base shadow-lg animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              Luar Biasa! Jawabanmu Benar! (+1 Bintang)
            </div>
          )}

          {gameFeedback === 'wrong' && (
            <div className="text-red-600 font-bold text-sm">
              Coba cari lagi angka {gameTarget} ya! Kamu pasti bisa! 🌟
            </div>
          )}
        </div>
      ) : (
        /* STANDARD NUMBER LEARNING STAGE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Selected Number Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-3 border-orange-200 shadow-lg space-y-6">
            {/* Prev / Next controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Angka {selectedNumber > 1 ? selectedNumber - 1 : 100}</span>
              </button>

              <div className="text-xs font-bold text-slate-400">
                Angka {selectedNumber} dari 100
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95"
              >
                <span>Angka {selectedNumber < 100 ? selectedNumber + 1 : 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Number Showcase */}
            <div className="bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl p-6 sm:p-7 border-3 border-orange-200 text-center relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Big Number Badge with touch speech */}
                <button
                  onClick={() => sound.speakTouch(`Angka ${selectedNumber}! ${wordIndonesian}!`)}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transform rotate-1 border-4 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Ketuk untuk mendengar angka"
                >
                  <span className="text-6xl sm:text-7xl font-black font-display drop-shadow-md">
                    {selectedNumber}
                  </span>
                </button>

                <div className="text-center sm:text-left">
                  <div className="inline-block px-3 py-1 bg-white/90 rounded-full text-xs font-extrabold text-orange-800 shadow-xs mb-1">
                    Ejaan Bahasa Indonesia
                  </div>
                  <button
                    onClick={() => sound.speakTouch(`${wordIndonesian}!`)}
                    className="text-3xl sm:text-4xl font-black text-slate-900 font-display hover:text-orange-600 transition-colors cursor-pointer block"
                  >
                    {wordIndonesian}
                  </button>
                  <button
                    onClick={() => sound.speakTouch(`${objectName}!`)}
                    className="text-orange-950 font-semibold text-sm sm:text-base mt-1 flex items-center justify-center sm:justify-start gap-1.5 hover:underline cursor-pointer"
                  >
                    <span>{emoji}</span>
                    <span>{objectName}</span>
                  </button>
                </div>
              </div>

              {/* Tap to count display items */}
              {selectedNumber <= 20 ? (
                <div className="mt-6 pt-5 border-t border-orange-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-orange-900">
                      👆 Ketuk benda untuk berhitung ({tappedIndices.length} / {maxTapItems}):
                    </span>
                    {tappedIndices.length > 0 && (
                      <button
                        onClick={() => {
                          setTappedIndices([]);
                          setHasCompletedCounting(false);
                          sound.playPop();
                        }}
                        className="text-xs font-bold text-orange-700 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Ulangi
                      </button>
                    )}
                  </div>

                  <div className="bg-white/90 rounded-2xl p-3 border-2 border-dashed border-orange-300 flex flex-wrap items-center justify-center gap-2.5 min-h-[100px]">
                    {Array.from({ length: maxTapItems }).map((_, idx) => {
                      const isTapped = tappedIndices.includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleTapItem(idx)}
                          className={`relative p-2 rounded-xl text-3xl sm:text-4xl transition-all transform active:scale-90 ${
                            isTapped
                              ? 'bg-amber-100 border-2 border-amber-400 scale-105 shadow-sm'
                              : 'bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:scale-110'
                          }`}
                        >
                          <span>{emoji}</span>
                          {isTapped && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-md">
                              {tappedIndices.indexOf(idx) + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Visual representation for 21-100 */
                <div className="mt-5 pt-4 border-t border-orange-200/80 text-xs text-orange-900 font-bold">
                  <span>Angka ini terdiri dari </span>
                  <span className="px-2 py-0.5 bg-orange-200 rounded-md font-black">{Math.floor(selectedNumber / 10)} Puluhan</span>
                  <span> dan </span>
                  <span className="px-2 py-0.5 bg-amber-200 rounded-md font-black">{selectedNumber % 10} Satuan</span>
                </div>
              )}

              {/* Voice button */}
              <div className="mt-5 flex justify-center">
                <button
                  onClick={playSpeech}
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-md transition-all active:scale-95 text-xs sm:text-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Suara Ejaan Angka</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Number Tracing Pad */}
          <div className="lg:col-span-5 space-y-4">
            <TracingCanvas
              guideText={`${selectedNumber}`}
              subText={`angka ${selectedNumber}`}
              themeColor="#F97316"
            />
          </div>
        </div>
      )}

      {/* 100-CHART NAVIGATION GRID (Papan 100 Angka) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-orange-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <span>Papan 100 Angka Juara:</span>
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md font-bold">
              {displayedNumbers.length} Angka Ditampilkan
            </span>
          </h4>
          <span className="text-xs font-semibold text-slate-400">
            Ketuk angka manapun untuk melihat ejaannya
          </span>
        </div>

        {/* 10 columns grid for hundred chart */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 max-h-[420px] overflow-y-auto p-1">
          {displayedNumbers.map((num) => {
            const isSelected = selectedNumber === num;
            return (
              <button
                key={num}
                onClick={() => handleSelectNumber(num)}
                className={`py-2.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md ring-3 ring-amber-300 scale-108 font-black'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-800 border border-slate-200 hover:border-orange-300 hover:scale-105'
                }`}
              >
                <span className="text-lg sm:text-xl font-black font-display">
                  {num}
                </span>
                <span className="text-[8px] font-bold opacity-75 truncate w-full text-center">
                  {getIndonesianNumberWord(num)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
