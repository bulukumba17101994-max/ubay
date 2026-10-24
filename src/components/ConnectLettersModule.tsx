import React, { useState } from 'react';
import { Volume2, Sparkles, ChevronLeft, ChevronRight, RotateCcw, Award, CheckCircle2, Link2, BookOpen, Layers } from 'lucide-react';
import { WORDS_DATA, WordConnectItem, CATEGORIES_LIST, DOT_PUZZLES } from '../data/wordConnectData';
import { TracingCanvas } from './TracingCanvas';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ConnectLettersModuleProps {
  onEarnStar: (amount: number) => void;
}

export const ConnectLettersModule: React.FC<ConnectLettersModuleProps> = ({ onEarnStar }) => {
  const [activeTab, setActiveTab] = useState<'spell' | 'dots' | 'trace'>('spell');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWordIdx, setSelectedWordIdx] = useState(0);

  // Mode: Syllables (BO - LA) vs Letter-by-Letter (B - O - L - A)
  const [connectMode, setConnectMode] = useState<'syllables' | 'letters'>('syllables');

  // Filtered words by category
  const filteredWords = selectedCategory === 'all'
    ? WORDS_DATA
    : WORDS_DATA.filter((w) => w.category === selectedCategory);

  const safeIdx = Math.min(selectedWordIdx, Math.max(0, filteredWords.length - 1));
  const currentWord = filteredWords[safeIdx] || WORDS_DATA[0];

  // Spelling state
  const [placedItems, setPlacedItems] = useState<string[]>([]);
  const [isWordCompleted, setIsWordCompleted] = useState(false);

  // Dot puzzle state
  const [dotPuzzleIdx, setDotPuzzleIdx] = useState(0);
  const currentPuzzle = DOT_PUZZLES[dotPuzzleIdx];
  const [connectedDots, setConnectedDots] = useState<string[]>([]);
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);

  // Change Word
  const handleSelectWord = (idx: number) => {
    sound.playPop();
    setSelectedWordIdx(idx);
    setPlacedItems([]);
    setIsWordCompleted(false);
    const item = filteredWords[idx] || WORDS_DATA[0];
    sound.speak(`Sambung kata ${item.word}! Contoh: ${item.syllables.join(' ')}.`);
  };

  const handleNextWord = () => {
    sound.playPop();
    const nextIdx = (safeIdx + 1) % filteredWords.length;
    handleSelectWord(nextIdx);
  };

  const handlePrevWord = () => {
    sound.playPop();
    const prevIdx = (safeIdx - 1 + filteredWords.length) % filteredWords.length;
    handleSelectWord(prevIdx);
  };

  // Tap Suku Kata or Letter Block
  const handleTapBlock = (token: string) => {
    if (isWordCompleted) return;

    const expectedTokens = connectMode === 'syllables' ? currentWord.syllables : currentWord.letters;
    const nextIndex = placedItems.length;
    const expectedToken = expectedTokens[nextIndex];

    if (token === expectedToken) {
      sound.playPop();
      sound.speak(token);
      const newPlaced = [...placedItems, token];
      setPlacedItems(newPlaced);

      // Check if finished
      if (newPlaced.length === expectedTokens.length) {
        setIsWordCompleted(true);
        setTimeout(() => {
          sound.playFanfare();
          onEarnStar(1);
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.5 }
          });
          sound.speak(`Horeee! ${currentWord.spellingGuide}`);
        }, 300);
      }
    } else {
      sound.playWrong();
      sound.speak(`Bukan ${token}. Ayo cari suku kata atau huruf ${expectedToken}!`);
    }
  };

  const handleReset = () => {
    sound.playPop();
    setPlacedItems([]);
    setIsWordCompleted(false);
  };

  const playSpellingGuideVoice = () => {
    sound.playPop();
    sound.speak(`${currentWord.spellingGuide}. ${currentWord.hint}`);
  };

  // --- CONNECT THE DOTS FUNCTIONS ---
  const handleDotClick = (letter: string) => {
    if (isPuzzleCompleted) return;

    const expectedIndex = connectedDots.length;
    const expectedDot = currentPuzzle.dots[expectedIndex];

    if (expectedDot && letter === expectedDot.letter) {
      sound.playPop();
      sound.speak(`Huruf ${letter}!`);
      const newConnected = [...connectedDots, letter];
      setConnectedDots(newConnected);

      if (newConnected.length === currentPuzzle.dots.length) {
        setIsPuzzleCompleted(true);
        setTimeout(() => {
          sound.playFanfare();
          onEarnStar(2);
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.5 }
          });
          sound.speak(currentPuzzle.rewardMessage);
        }, 400);
      }
    } else {
      sound.playWrong();
      const nextLetter = expectedDot ? expectedDot.letter : 'A';
      sound.speak(`Ayo cari huruf ${nextLetter}!`);
    }
  };

  const handleResetDots = () => {
    sound.playPop();
    setConnectedDots([]);
    setIsPuzzleCompleted(false);
  };

  const handleNextPuzzle = () => {
    sound.playPop();
    const nextIdx = (dotPuzzleIdx + 1) % DOT_PUZZLES.length;
    setDotPuzzleIdx(nextIdx);
    setConnectedDots([]);
    setIsPuzzleCompleted(false);
    sound.speak(`Teka-teki baru: Sambung titik membentuk ${DOT_PUZZLES[nextIdx].name}!`);
  };

  // Get scrambled choice blocks
  const targetTokens = connectMode === 'syllables' ? currentWord.syllables : currentWord.letters;
  // Distractor tokens
  const distractors = connectMode === 'syllables'
    ? ['BA', 'KI', 'DA', 'PI', 'TO'].filter((s) => !targetTokens.includes(s)).slice(0, 2)
    : ['A', 'K', 'S', 'O'].filter((c) => !targetTokens.includes(c)).slice(0, 2);
  const choiceTokens = [...targetTokens, ...distractors].sort(() => 0.5 - Math.random());

  return (
    <div className="space-y-6">
      {/* Title Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-9xl">
          🔤
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-yellow-200 mb-2">
              <Link2 className="w-3.5 h-3.5" />
              Arena Sambung Huruf & Suku Kata TK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Sambung Huruf: BO - LA (BOLA)
            </h2>
            <p className="text-blue-100 text-sm font-medium mt-1 max-w-xl">
              Rangkai suku kata dan huruf untuk <strong>Nomor</strong> (SATU, DUA...), <strong>Hewan</strong> (SINGA, KUDA...), dan <strong>Kendaraan</strong> (MOBIL, MOTOR...)!
            </p>
          </div>

          {/* Sub Navigation Modes */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl border border-white/20 shrink-0">
            <button
              onClick={() => {
                setActiveTab('spell');
                sound.playPop();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'spell'
                  ? 'bg-white text-blue-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🧩 Sambung Kata
            </button>
            <button
              onClick={() => {
                setActiveTab('dots');
                sound.playPop();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'dots'
                  ? 'bg-white text-blue-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              ⭐ Titik A-Z
            </button>
            <button
              onClick={() => {
                setActiveTab('trace');
                sound.playPop();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'trace'
                  ? 'bg-white text-blue-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              ✍️ Tebalkan
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY SELECTOR STRIP: NOMOR, HEWAN, KENDARAAN, OLAHRAGA */}
      {activeTab === 'spell' && (
        <div className="bg-white rounded-3xl p-3 sm:p-4 border-3 border-indigo-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-xs font-black text-slate-500 mr-1 whitespace-nowrap">
              Kategori:
            </span>
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedWordIdx(0);
                    setPlacedItems([]);
                    setIsWordCompleted(false);
                    sound.playPop();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Toggle Mode: Suku Kata vs Huruf */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => {
                setConnectMode('syllables');
                setPlacedItems([]);
                setIsWordCompleted(false);
                sound.playPop();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                connectMode === 'syllables'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-indigo-700'
              }`}
            >
              Suku Kata (BO - LA)
            </button>
            <button
              onClick={() => {
                setConnectMode('letters');
                setPlacedItems([]);
                setIsWordCompleted(false);
                sound.playPop();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                connectMode === 'letters'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-indigo-700'
              }`}
            >
              Huruf (B - O - L - A)
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: RANGKAI SUKU KATA & HURUF */}
      {activeTab === 'spell' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-lg space-y-6">
            {/* Header with Prev/Next Word Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevWord}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="text-xs font-bold text-slate-400">
                Kata {safeIdx + 1} dari {filteredWords.length} ({currentWord.categoryLabel})
              </div>

              <button
                onClick={handleNextWord}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Word Showcase Canvas */}
            <div
              className="rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden transition-all shadow-inner"
              style={{ backgroundColor: `${currentWord.color}15`, borderColor: currentWord.color, borderWidth: '2px' }}
            >
              <div className="inline-block px-3.5 py-1 bg-white rounded-full text-xs font-black text-slate-700 shadow-xs mb-3">
                Kategori: {currentWord.categoryLabel}
              </div>

              {/* Big Illustration with touch speech */}
              <button
                onClick={() => sound.speakTouch(`${currentWord.word}! ${currentWord.hint}`)}
                className="text-7xl sm:text-8xl my-2 animate-soft-bounce drop-shadow-md hover:scale-115 active:scale-90 transition-transform cursor-pointer"
                title="Ketuk gambar untuk mendengar nama"
              >
                {currentWord.emoji}
              </button>

              {/* Syllable Word Display with touch on individual syllables */}
              <div className="my-2">
                <div className="text-xs font-black text-indigo-900 tracking-wider mb-1.5 uppercase">
                  Sentuh Suku Kata untuk Mendengar Bunyinya:
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {currentWord.syllables.map((syl, i) => (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => sound.speakTouch(`${syl}!`)}
                        className="px-3.5 py-1.5 bg-white hover:bg-yellow-100 border-2 border-indigo-400 hover:border-amber-400 rounded-xl font-black text-2xl sm:text-3xl font-display text-indigo-900 shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                        title={`Ketuk suku kata ${syl}`}
                      >
                        {syl}
                      </button>
                      {i < currentWord.syllables.length - 1 && (
                        <span className="text-xl font-black text-indigo-400">-</span>
                      )}
                    </React.Fragment>
                  ))}
                  <span className="text-xl font-black text-indigo-500">=</span>
                  <button
                    onClick={() => sound.speakTouch(`${currentWord.word}!`)}
                    className="text-2xl sm:text-3xl font-black font-display text-emerald-600 hover:scale-105 transition-transform cursor-pointer"
                    title="Ketuk kata utuh"
                  >
                    ({currentWord.word.toLowerCase()})
                  </button>
                </div>
              </div>

              <p
                onClick={() => sound.speakTouch(currentWord.hint)}
                className="text-slate-600 text-sm font-medium mt-2 max-w-md mx-auto cursor-pointer hover:text-slate-900"
              >
                "{currentWord.hint}"
              </p>
            </div>

            {/* SLOTS FOR CONNECTING (SUKU KATA ATAU HURUF) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">
                  {connectMode === 'syllables' ? 'Sambungan Suku Kata:' : 'Kotak Huruf Tersambung:'}
                </span>
                {placedItems.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Ulangi Sambungan
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                {targetTokens.map((token, idx) => {
                  const isFilled = placedItems.length > idx;
                  const isNext = placedItems.length === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isFilled) {
                          sound.speakTouch(`${placedItems[idx]}!`);
                        } else {
                          sound.speakTouch(`Kotak nomor ${idx + 1}. Ayo isi dengan ${token}!`);
                        }
                      }}
                      className={`min-w-16 h-18 sm:min-w-20 sm:h-20 px-3 rounded-2xl border-3 flex items-center justify-center text-2xl sm:text-3xl font-black font-display transition-all cursor-pointer ${
                        isFilled
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105 active:scale-95'
                          : isNext
                          ? 'bg-amber-50 border-dashed border-amber-400 text-amber-500 animate-pulse'
                          : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'
                      }`}
                    >
                      {isFilled ? placedItems[idx] : '?'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CHOICE BLOCKS TO TAP AND CONNECT */}
            {!isWordCompleted ? (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 block mb-3 text-center">
                  Ketuk {connectMode === 'syllables' ? 'suku kata' : 'huruf'} yang benar secara berurutan:
                </span>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {choiceTokens.map((token, i) => (
                    <button
                      key={i}
                      onClick={() => handleTapBlock(token)}
                      className="min-w-16 sm:min-w-20 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xl sm:text-2xl font-display shadow-lg hover:shadow-amber-400/40 border-3 border-amber-500 transform hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                    >
                      {token}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-950 rounded-2xl text-center space-y-2 animate-bounce">
                <div className="inline-flex items-center gap-1.5 text-base font-black text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Hebat! Tersambung Sempurna: {currentWord.syllables.join(' - ')} = {currentWord.word}! (+1 ⭐)
                </div>
                <div>
                  <button
                    onClick={handleNextWord}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Lanjut ke Kata Berikutnya →
                  </button>
                </div>
              </div>
            )}

            {/* Pronunciation Guide Voice Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={playSpellingGuideVoice}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-2xl border-2 border-indigo-200 transition-all text-xs active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>Dengarkan Cara Mengeja (Eja Suku Kata)</span>
              </button>
            </div>
          </div>

          {/* Word List on the right */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-3 border-indigo-200 shadow-md space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>Pilih Kata {selectedCategory.toUpperCase()}:</span>
              <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md font-bold">
                {filteredWords.length} Kata
              </span>
            </h4>

            <div className="grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto p-1">
              {filteredWords.map((w, idx) => {
                const isSelected = safeIdx === idx;
                return (
                  <button
                    key={w.id}
                    onClick={() => handleSelectWord(idx)}
                    className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md font-black scale-102'
                        : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800 font-bold'
                    }`}
                  >
                    <span className="text-xl">{w.emoji}</span>
                    <div className="truncate">
                      <div className="text-xs font-black truncate">{w.word}</div>
                      <div className="text-[10px] opacity-80 truncate">{w.syllables.join('-')}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONNECT THE DOTS A-Z */}
      {activeTab === 'dots' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-purple-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-extrabold uppercase mb-1">
                Teka-Teki Titik Huruf
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                Hubungkan Titik Huruf: {currentPuzzle.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Ketuk titik huruf secara berurutan mulai dari A, B, C, D... sampai selesai!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetDots}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Titik</span>
              </button>

              <button
                onClick={handleNextPuzzle}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Gambar Lain</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Connect the Dots SVG Stage */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-b from-indigo-50 to-purple-50 rounded-3xl border-3 border-purple-300 p-4 overflow-hidden shadow-inner flex items-center justify-center select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
              {connectedDots.map((dotLetter, i) => {
                if (i === 0) return null;
                const prevDot = currentPuzzle.dots.find((d) => d.letter === connectedDots[i - 1]);
                const currDot = currentPuzzle.dots.find((d) => d.letter === dotLetter);
                if (!prevDot || !currDot) return null;

                return (
                  <line
                    key={i}
                    x1={prevDot.x}
                    y1={prevDot.y}
                    x2={currDot.x}
                    y2={currDot.y}
                    stroke="#8B5CF6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />
                );
              })}

              {isPuzzleCompleted && currentPuzzle.dots.length > 2 && (
                <line
                  x1={currentPuzzle.dots[currentPuzzle.dots.length - 1].x}
                  y1={currentPuzzle.dots[currentPuzzle.dots.length - 1].y}
                  x2={currentPuzzle.dots[0].x}
                  y2={currentPuzzle.dots[0].y}
                  stroke="#8B5CF6"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {isPuzzleCompleted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xs z-10 animate-fadeIn">
                <span className="text-7xl sm:text-8xl animate-bounce">
                  {currentPuzzle.emoji}
                </span>
                <div className="mt-2 px-4 py-1.5 bg-amber-400 text-blue-950 font-black rounded-2xl text-sm shadow-lg">
                  {currentPuzzle.rewardMessage} (+2 ⭐)
                </div>
              </div>
            )}

            {currentPuzzle.dots.map((dot, idx) => {
              const isConnected = connectedDots.includes(dot.letter);
              const isNextExpected = connectedDots.length === idx;

              return (
                <button
                  key={dot.letter}
                  onClick={() => handleDotClick(dot.letter)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center font-black text-sm sm:text-base font-display transition-transform ${
                    isConnected
                      ? 'bg-purple-600 text-white border-purple-800 shadow-md scale-105'
                      : isNextExpected
                      ? 'bg-amber-400 text-blue-950 border-amber-500 scale-125 shadow-lg animate-bounce ring-4 ring-amber-200 cursor-pointer'
                      : 'bg-white text-slate-700 border-purple-300 hover:scale-110 cursor-pointer shadow-xs'
                  }`}
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                >
                  {dot.letter}
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs font-bold text-slate-500">
            Titik tersambung: <span className="text-purple-700 font-black">{connectedDots.length}</span> dari {currentPuzzle.dots.length} huruf
          </div>
        </div>
      )}

      {/* TAB 3: TEBALKAN KATA */}
      {activeTab === 'trace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <TracingCanvas
              guideText={currentWord.word}
              subText={`kata ${currentWord.word} (${currentWord.syllables.join('-')})`}
              themeColor={currentWord.color}
            />
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-3 border-indigo-200 shadow-md space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900">
              Pilih Kata untuk Ditebalkan:
            </h4>
            <div className="grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto p-1">
              {filteredWords.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => handleSelectWord(idx)}
                  className={`p-2 rounded-xl border text-left text-xs font-bold flex items-center gap-1.5 ${
                    safeIdx === idx
                      ? 'bg-indigo-600 text-white border-indigo-700 font-black shadow-xs'
                      : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{w.emoji}</span>
                  <span className="truncate">{w.word}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
