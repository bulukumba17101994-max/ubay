import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, RotateCcw, Volume2, Flag, Award, CheckCircle2 } from 'lucide-react';
import { LETTERS_DATA, NUMBERS_DATA, COLORS_DATA } from '../data/learningData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RaceQuizModuleProps {
  onEarnStar: (amount: number) => void;
}

interface Question {
  id: string;
  category: 'huruf' | 'angka' | 'warna';
  prompt: string;
  visualCue?: string;
  visualItems?: string[];
  options: { label: string; value: string; isCorrect: boolean; color?: string; emoji?: string }[];
  congratsMessage: string;
}

export const RaceQuizModule: React.FC<RaceQuizModuleProps> = ({ onEarnStar }) => {
  const TOTAL_STEPS = 5;
  const [currentStep, setCurrentStep] = useState(0); // 0 to 5
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Generate 5 random questions across letters, numbers, and colors
  const generateQuestions = (): Question[] => {
    const list: Question[] = [];

    // 1. Letter Question
    const randomLetter = LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)];
    const distLetters = LETTERS_DATA.filter((l) => l.id !== randomLetter.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const letterOptions = [
      { label: randomLetter.char, value: randomLetter.id, isCorrect: true, emoji: randomLetter.emoji },
      { label: distLetters[0].char, value: distLetters[0].id, isCorrect: false, emoji: distLetters[0].emoji },
      { label: distLetters[1].char, value: distLetters[1].id, isCorrect: false, emoji: distLetters[1].emoji }
    ].sort(() => 0.5 - Math.random());

    list.push({
      id: 'q-letter',
      category: 'huruf',
      prompt: `Manakah huruf "${randomLetter.char}" untuk "${randomLetter.word}"?`,
      visualCue: randomLetter.emoji,
      options: letterOptions,
      congratsMessage: `Tepat sekali! Huruf ${randomLetter.char} untuk ${randomLetter.word}!`
    });

    // 2. Number Count Question
    const randomNum = NUMBERS_DATA[Math.floor(Math.random() * 6) + 1]; // 2 to 7
    const distNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      .filter((n) => n !== randomNum.number)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const numOptions = [
      { label: `${randomNum.number}`, value: `${randomNum.number}`, isCorrect: true },
      { label: `${distNums[0]}`, value: `${distNums[0]}`, isCorrect: false },
      { label: `${distNums[1]}`, value: `${distNums[1]}`, isCorrect: false }
    ].sort(() => 0.5 - Math.random());

    list.push({
      id: 'q-number',
      category: 'angka',
      prompt: `Ada berapa banyak ${randomNum.singular} di bawah ini?`,
      visualItems: Array.from({ length: randomNum.number }).map(() => randomNum.emoji),
      options: numOptions,
      congratsMessage: `Hebat! Ada ${randomNum.number} ${randomNum.singular}!`
    });

    // 3. Color Question
    const randomColor = COLORS_DATA[Math.floor(Math.random() * COLORS_DATA.length)];
    const distColors = COLORS_DATA.filter((c) => c.id !== randomColor.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const colorOptions = [
      { label: randomColor.name, value: randomColor.id, isCorrect: true, color: randomColor.hex },
      { label: distColors[0].name, value: distColors[0].id, isCorrect: false, color: distColors[0].hex },
      { label: distColors[1].name, value: distColors[1].id, isCorrect: false, color: distColors[1].hex }
    ].sort(() => 0.5 - Math.random());

    list.push({
      id: 'q-color',
      category: 'warna',
      prompt: `Manakah warna "${randomColor.name}" (${randomColor.teamName})?`,
      visualCue: randomColor.exampleItems[0].emoji,
      options: colorOptions,
      congratsMessage: `Benar! Itu warna ${randomColor.name}!`
    });

    // 4. Letter Sound/Word Question
    const randomLetter2 = LETTERS_DATA[Math.floor(Math.random() * LETTERS_DATA.length)];
    const distLetters2 = LETTERS_DATA.filter((l) => l.id !== randomLetter2.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const letterOptions2 = [
      { label: randomLetter2.word, value: randomLetter2.id, isCorrect: true, emoji: randomLetter2.emoji },
      { label: distLetters2[0].word, value: distLetters2[0].id, isCorrect: false, emoji: distLetters2[0].emoji },
      { label: distLetters2[1].word, value: distLetters2[1].id, isCorrect: false, emoji: distLetters2[1].emoji }
    ].sort(() => 0.5 - Math.random());

    list.push({
      id: 'q-word',
      category: 'huruf',
      prompt: `Benda mana yang diawali dengan huruf "${randomLetter2.char}"?`,
      options: letterOptions2,
      congratsMessage: `Pintar! "${randomLetter2.word}" diawali huruf ${randomLetter2.char}!`
    });

    // 5. Final Grand Prix Number/Color Combo Question
    const grandNum = NUMBERS_DATA[Math.floor(Math.random() * 5)]; // 1 to 5
    const distGrand = [1, 2, 3, 4, 5, 6].filter((n) => n !== grandNum.number).slice(0, 2);
    const grandOptions = [
      { label: `${grandNum.number}`, value: `${grandNum.number}`, isCorrect: true },
      { label: `${distGrand[0]}`, value: `${distGrand[0]}`, isCorrect: false },
      { label: `${distGrand[1]}`, value: `${distGrand[1]}`, isCorrect: false }
    ].sort(() => 0.5 - Math.random());

    list.push({
      id: 'q-final',
      category: 'angka',
      prompt: `Tikungan terakhir! Hitung berapa banyak piala juara ini!`,
      visualItems: Array.from({ length: grandNum.number }).map(() => '🏆'),
      options: grandOptions,
      congratsMessage: `Luar biasa! Mobil melesat melewati garis finish!`
    });

    return list;
  };

  const startNewRace = () => {
    sound.playWhistle();
    const qList = generateQuestions();
    setQuestions(qList);
    setQuestionIndex(0);
    setCurrentStep(0);
    setIsFinished(false);
    setFeedback('idle');

    if (qList[0]) {
      sound.speak(qList[0].prompt);
    }
  };

  useEffect(() => {
    startNewRace();
  }, []);

  const currentQ = questions[questionIndex];

  const handleSelectOption = (isCorrect: boolean, congratsMsg: string) => {
    if (isFinished || !currentQ) return;

    if (isCorrect) {
      sound.playEngineRev();
      sound.playCorrect();
      setFeedback('correct');

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onEarnStar(1);

      sound.speak(congratsMsg);

      if (nextStep >= TOTAL_STEPS) {
        // WINNER!
        setTimeout(() => {
          setIsFinished(true);
          sound.playFanfare();
          sound.speak('Selamat! Kamu juara 1 balapan sirkuit cilik! Hebat sekali!');
          onEarnStar(3); // bonus stars for finishing!
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 }
          });
        }, 800);
      } else {
        setTimeout(() => {
          setQuestionIndex((prev) => prev + 1);
          setFeedback('idle');
          if (questions[questionIndex + 1]) {
            sound.speak(questions[questionIndex + 1].prompt);
          }
        }, 1500);
      }
    } else {
      sound.playWrong();
      setFeedback('wrong');
      sound.speak('Hampir benar! Ayo coba lagi ya!');
    }
  };

  const readQuestion = () => {
    if (currentQ) {
      sound.playPop();
      sound.speak(currentQ.prompt);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          🏁
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-200 mb-2">
              <Award className="w-3.5 h-3.5" />
              Sirkuit Grand Prix Anak TK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Balapan Kuis Juara Cilik
            </h2>
            <p className="text-rose-100 text-sm font-medium mt-1 max-w-xl">
              Jawab pertanyaan tentang huruf, angka, dan warna untuk melajukan mobil balap menuju podium juara!
            </p>
          </div>

          <button
            onClick={startNewRace}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-red-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 active:scale-95 shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Balapan Baru</span>
          </button>
        </div>
      </div>

      {/* RACE TRACK VISUALIZER */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-red-200 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Lintasan Sirkuit Balap
            </h3>
          </div>
          <div className="text-xs font-extrabold text-slate-500">
            Posisi: <span className="text-red-600 font-black">{currentStep}</span> / {TOTAL_STEPS} Tikungan
          </div>
        </div>

        {/* Asphalt Track with Racing Lines */}
        <div className="relative h-28 sm:h-32 bg-slate-900 rounded-3xl border-4 border-slate-800 p-3 overflow-hidden flex items-center shadow-inner">
          {/* Track Dash Markings */}
          <div className="absolute inset-x-0 h-1 border-t-2 border-dashed border-yellow-400 opacity-60 top-1/2 -translate-y-1/2" />

          {/* Start Line */}
          <div className="absolute left-4 top-2 bottom-2 w-3 bg-white/40 rounded-sm flex items-center justify-center">
            <span className="text-[9px] font-black text-white transform -rotate-90">START</span>
          </div>

          {/* Finish Line (Checkerboard) */}
          <div className="absolute right-4 top-2 bottom-2 w-6 bg-checker-pattern border-2 border-white rounded-sm shadow-md flex items-center justify-center">
            <span className="text-[8px] font-black bg-white/90 px-0.5 rounded-xs text-slate-900 transform -rotate-90">
              FINISH
            </span>
          </div>

          {/* Race Car Animated on Track */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-20"
            style={{
              left: `calc(1rem + ${(currentStep / TOTAL_STEPS) * 78}%)`
            }}
          >
            <div className="relative transform hover:scale-110 transition-transform">
              {/* Cute Turbo Racecar Emoji & Number */}
              <div className="text-5xl sm:text-6xl filter drop-shadow-lg">
                🏎️
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full shadow-xs whitespace-nowrap">
                #7 Turbo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ INTERACTION CARD */}
      {!isFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-red-200 shadow-lg text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-extrabold uppercase">
              Pertanyaan {questionIndex + 1} dari {TOTAL_STEPS}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {currentQ.prompt}
            </h3>

            {/* Visual Cue or Items */}
            {currentQ.visualItems && (
              <div className="flex flex-wrap items-center justify-center gap-3 py-2 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto">
                {currentQ.visualItems.map((emoji, i) => (
                  <span key={i} className="text-4xl animate-soft-bounce">
                    {emoji}
                  </span>
                ))}
              </div>
            )}

            {currentQ.visualCue && (
              <div className="text-5xl py-1 animate-soft-bounce">
                {currentQ.visualCue}
              </div>
            )}

            <button
              onClick={readQuestion}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ulangi Suara</span>
            </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.isCorrect, currentQ.congratsMessage)}
                className="p-5 sm:p-6 bg-slate-50 hover:bg-red-50 border-3 border-slate-200 hover:border-red-400 rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-2 group"
              >
                {opt.color ? (
                  <div
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: opt.color }}
                  />
                ) : opt.emoji ? (
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                ) : null}

                <span className="text-2xl sm:text-3xl font-black text-slate-800 group-hover:text-red-700 font-display">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Feedback Banner */}
          {feedback === 'correct' && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-extrabold rounded-2xl text-base shadow-lg animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              Bagus Sekali! Mobil Balap Maju Kencang! (+1 Bintang)
            </div>
          )}

          {feedback === 'wrong' && (
            <div className="text-red-600 font-bold text-sm">
              Kurang tepat sedikit, coba pilih lagi ya! Semangat! 💪
            </div>
          )}
        </div>
      ) : isFinished ? (
        /* FINISH LINE PODIUM CELEBRATION */
        <div className="bg-gradient-to-b from-amber-50 to-yellow-100 rounded-3xl p-8 sm:p-12 border-4 border-amber-300 text-center space-y-6 shadow-xl">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-400 border-4 border-white shadow-2xl flex items-center justify-center text-6xl animate-bounce">
            🏆
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <div className="inline-block px-4 py-1.5 bg-amber-200 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
              PODIUM 1 GRAND PRIX
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              Selamat Juara Cilik!
            </h3>
            <p className="text-amber-950 font-bold text-base">
              Mobil balapmu sukses menembus garis finish! Kamu berhasil menguasai huruf, angka, dan warna!
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-amber-900 font-black rounded-2xl shadow-md border-2 border-amber-300 text-lg">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Hadiah: +3 Bintang Kemenangan!
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={startNewRace}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-2xl shadow-xl transition-all active:scale-95 text-base flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Balapan Lagi Yuk!</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
