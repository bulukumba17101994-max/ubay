import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Paintbrush, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface TracingCanvasProps {
  guideText: string;
  subText?: string;
  themeColor?: string;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  guideText,
  subText,
  themeColor = '#2563EB'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState(themeColor);
  const [brushSize, setBrushSize] = useState(14);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [
    { name: 'Biru', hex: '#2563EB' },
    { name: 'Merah', hex: '#EF4444' },
    { name: 'Kuning', hex: '#EAB308' },
    { name: 'Hijau', hex: '#10B981' },
    { name: 'Oranye', hex: '#F97316' },
    { name: 'Ungu', hex: '#8B5CF6' }
  ];

  // Initialize or clear canvas
  const clearCanvas = () => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [guideText]);

  // Coordinate helper handling DPR
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-blue-200 shadow-md">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-xl">
            <Paintbrush className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-blue-950 text-base">Ayo Coret & Tebalkan!</h4>
            <p className="text-xs text-slate-500 font-medium">
              Ikuti bentuk {subText || 'huruf'} dengan jarimu atau mouse
            </p>
          </div>
        </div>

        <button
          onClick={clearCanvas}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-95"
          title="Hapus Coretan"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Hapus</span>
        </button>
      </div>

      {/* Canvas Drawing Surface with Letter Guide Backdrop */}
      <div className="relative w-full aspect-[4/3] max-h-[320px] bg-amber-50/50 rounded-2xl border-2 border-dashed border-amber-300 overflow-hidden flex items-center justify-center touch-none">
        {/* Subtle lined paper guides for kindergarten writing */}
        <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-30">
          <div className="border-b border-red-300 w-full" />
          <div className="border-b border-dashed border-blue-400 w-full" />
          <div className="border-b border-blue-400 w-full" />
        </div>

        {/* Big Dotted Guideline Text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="text-[120px] sm:text-[160px] font-extrabold text-slate-200 font-display tracking-tight leading-none drop-shadow-sm">
            {guideText}
          </span>
        </div>

        {/* Foreground Interactive Canvas */}
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 w-full h-full cursor-crosshair"
        />

        {!hasDrawn && (
          <div className="absolute bottom-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-amber-800 pointer-events-none flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Tebalkan garisnya di sini!
          </div>
        )}
      </div>

      {/* Color Swatches and Brush Options */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-1">Warna Spidol:</span>
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => {
                setBrushColor(c.hex);
                sound.playPop();
              }}
              className={`w-7 h-7 rounded-full transition-transform border-2 ${
                brushColor === c.hex ? 'scale-125 border-slate-900 shadow-md ring-2 ring-blue-300' : 'border-white hover:scale-110'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Tebal:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setBrushSize(10)}
              className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${
                brushSize === 10 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Sedang
            </button>
            <button
              onClick={() => setBrushSize(18)}
              className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${
                brushSize === 18 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tebal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
