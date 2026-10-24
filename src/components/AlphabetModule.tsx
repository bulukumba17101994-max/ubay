import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { LETTERS_DATA, LetterItem } from '../data/learningData';
import { TracingCanvas } from './TracingCanvas';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AlphabetModuleProps {
  onEarnStar: (amount: number) => void;
}

export const AlphabetModule: React.FC<AlphabetModuleProps> = ({ onEarnStar }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState<LetterItem | null>(null);
  const [quizOptions, setQuizOptions] = useState<LetterItem[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentLetter = LETTERS_DATA[selectedIndex];

  const handleSelectLetter = (index: number) => {
    sound.playPop();
    setSelectedIndex(index);
    const item = LETTERS_DATA[index];
    sound.speak(`Huruf ${item.char}. ${item.word}. ${item.sentence}`);
  };

  const handlePrev = () => {
    sound.playPop();
    const nextIdx = (selectedIndex - 1 + LETTERS_DATA.length) % LETTERS_DATA.length;
    setSelectedIndex(nextIdx);
    const item = LETTERS_DATA[nextIdx];
    sound.speak(`Huruf ${item.char}. ${item.word}.`);
  };

  const handleNext = () => {
    sound.playPop();
    const nextIdx = (selectedIndex + 1) % LETTERS_DATA.length;
    setSelectedIndex(nextIdx);
    const item = LETTERS_DATA[nextIdx];
    sound.speak(`Huruf ${item.char}. ${item.word}.`);
  };

  const playSpeech = () => {
    sound.playPop();
    sound.speak(`Huruf ${currentLetter.char}. ${currentLetter.word}! ${currentLetter.sentence}`);
  };

  // Start mini quiz
  const startQuiz = () => {
    sound.playWhistle();
    const target = LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)];
    // pick 2 distractors
    const distractors = LETTERS_DATA.filter((l) => l.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setQuizTarget(target);
    setQuizOptions(options);
    setQuizFeedback('idle');
    setQuizMode(true);

    sound.speak(`Tebak, yang mana huruf ${target.char} untuk ${target.word}?`);
  };

  const checkAnswer = (letter: LetterItem) => {
    if (!quizTarget) return;

    if (letter.id === quizTarget.id) {
      sound.playCorrect();
      setQuizFeedback('correct');
      onEarnStar(1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      sound.speak(`Horeee! Benar sekali! Huruf ${quizTarget.char} untuk ${quizTarget.word}!`);
      setTimeout(() => {
        startQuiz();
      }, 1600);
    } else {
      sound.playWrong();
      setQuizFeedback('wrong');
      sound.speak(`Ayo coba lagi, cari huruf ${quizTarget.char}!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-15 pointer-events-none text-9xl">
          🏎️
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-amber-300 mb-2">
              <Award className="w-3.5 h-3.5" />
              Sirkuit Alfabet Juara
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Mengenal Huruf A sampai Z
            </h2>
            <p className="text-blue-100 text-sm font-medium mt-1 max-w-xl">
              Ketuk huruf untuk dengarkan suaranya, tebalkan garisnya, dan kumpulkan bintang piala!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (quizMode) {
                  setQuizMode(false);
                  sound.playPop();
                } else {
                  startQuiz();
                }
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-amber-400/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              {quizMode ? 'Kembali Belajar' : 'Main Kuis Huruf'}
            </button>
          </div>
        </div>
      </div>

      {quizMode && quizTarget ? (
        /* QUIZ MODE INTERACTION */
        <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-md">
          <div className="max-w-md mx-auto space-y-3">
            <div className="inline-block px-4 py-1.5 bg-amber-200 text-amber-900 rounded-full text-xs font-extrabold uppercase tracking-wider">
              Tantangan Juara Cilik
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950">
              Yang manakah huruf{' '}
              <span className="text-3xl text-red-600 font-display">
                "{quizTarget.char}"
              </span>{' '}
              untuk{' '}
              <span className="text-blue-700 underline decoration-amber-400">
                {quizTarget.word}
              </span>
              ?
            </h3>
            <p className="text-sm text-slate-600 font-medium">
              Petunjuk: {quizTarget.emoji} {quizTarget.sentence}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => checkAnswer(opt)}
                className="group relative p-6 bg-white hover:bg-blue-50 border-3 border-blue-200 hover:border-blue-500 rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-4xl sm:text-5xl font-black text-blue-800 font-display">
                  {opt.char}
                  <span className="text-2xl text-blue-500 ml-1 font-semibold">{opt.lower}</span>
                </span>
                <span className="text-2xl">{opt.emoji}</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-extrabold rounded-2xl text-base shadow-lg animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              Hebat Sekali! Kamu Juara! (+1 Bintang)
            </div>
          )}

          {quizFeedback === 'wrong' && (
            <div className="text-red-600 font-bold text-sm">
              Coba lagi yuk, kamu pasti bisa! 💪
            </div>
          )}
        </div>
      ) : (
        /* STANDARD LEARNING STAGE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Letter Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-3 border-blue-200 shadow-lg space-y-6">
            {/* Top Bar with Prev/Next & Pronounce */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 font-bold rounded-2xl text-sm transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="text-xs font-bold text-slate-400">
                Huruf {selectedIndex + 1} dari 26
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 font-bold rounded-2xl text-sm transition-all active:scale-95"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Letter Showcase Visual */}
            <div
              className="rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: currentLetter.bgLight,
                borderColor: currentLetter.borderColor,
                borderWidth: '3px'
              }}
            >
              {/* Sport Tag Chip */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold text-white bg-blue-600 shadow-sm mb-4">
                <span>⚡ {currentLetter.sportTag}</span>
              </div>

              {/* Big Letters with interactive touch pronunciation */}
              <div className="flex items-baseline justify-center gap-3 sm:gap-4 my-2">
                <button
                  onClick={() => sound.speakTouch(`Huruf ${currentLetter.char} besar!`)}
                  className="text-8xl sm:text-9xl font-black font-display tracking-tight drop-shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  style={{ color: currentLetter.color }}
                  title="Ketuk untuk mendengar huruf besar"
                >
                  {currentLetter.char}
                </button>
                <button
                  onClick={() => sound.speakTouch(`Huruf ${currentLetter.lower} kecil!`)}
                  className="text-5xl sm:text-6xl font-extrabold text-slate-600 font-display hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title="Ketuk untuk mendengar huruf kecil"
                >
                  {currentLetter.lower}
                </button>
              </div>

              {/* Word & Illustration with touch pronunciation */}
              <div className="mt-4 flex flex-col items-center gap-2">
                <button
                  onClick={() => sound.speakTouch(`${currentLetter.word}! ${currentLetter.sentence}`)}
                  className="text-6xl sm:text-7xl my-1 animate-soft-bounce hover:scale-125 active:scale-90 transition-transform cursor-pointer"
                  title="Ketuk gambar untuk mendengar suara"
                >
                  {currentLetter.emoji}
                </button>
                <button
                  onClick={() => sound.speakTouch(`${currentLetter.word}!`)}
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {currentLetter.word}
                </button>
                <p
                  onClick={() => sound.speakTouch(currentLetter.sentence)}
                  className="text-slate-600 text-base sm:text-lg font-medium max-w-md mx-auto mt-1 cursor-pointer hover:text-slate-900"
                >
                  "{currentLetter.sentence}"
                </p>
              </div>

              {/* Big Speaker Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={playSpeech}
                  className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 text-base"
                >
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  <span>Dengarkan Suara</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Tracing Pad */}
          <div className="lg:col-span-5 space-y-4">
            <TracingCanvas
              guideText={currentLetter.char}
              subText={`huruf ${currentLetter.char}`}
              themeColor={currentLetter.color}
            />

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 flex items-center gap-3 shadow-xs">
              <span className="text-3xl">💡</span>
              <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                <strong className="text-amber-950 font-bold">Tips Ayah & Bunda:</strong> Minta si kecil menirukan ucapan huruf dan melacak bentuk huruf di atas garis putus-putus.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 26 Letters Navigation Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-blue-200 shadow-md">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="font-extrabold text-blue-950 text-base flex items-center gap-2">
            <span>Pilih Huruf Apapun:</span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-bold">
              26 Huruf
            </span>
          </h4>
          <span className="text-xs font-semibold text-slate-400">
            Klik salah satu kotak
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-2 sm:gap-2.5">
          {LETTERS_DATA.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectLetter(idx)}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg ring-3 ring-amber-300 scale-108 font-black'
                    : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-2 border-slate-200 hover:border-blue-400 hover:scale-102'
                }`}
              >
                <span className="text-xl sm:text-2xl font-black font-display">
                  {item.char}
                </span>
                <span className="text-[10px] opacity-80 font-bold truncate w-full text-center">
                  {item.word}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
