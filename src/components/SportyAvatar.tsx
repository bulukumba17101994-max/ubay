import React from 'react';
import { AvatarConfig } from '../types/avatar';

interface SportyAvatarProps {
  config: AvatarConfig;
  size?: number | string;
  className?: string;
  showBody?: boolean;
}

export const SportyAvatar: React.FC<SportyAvatarProps> = ({
  config,
  size = 120,
  className = '',
  showBody = true
}) => {
  const {
    headwear,
    headwearColor,
    hairColor,
    skinTone,
    jerseyColor,
    jerseyPattern,
    jerseyNumber,
    shortsColor,
    shoesColor,
    accessory,
    expression
  } = config;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox={showBody ? '0 0 200 240' : '0 0 200 170'}
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <filter id="avatar-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- LOWER BODY (Shorts, Legs, Sneakers) --- */}
        {showBody && (
          <g id="lower-body">
            {/* Ground Shadow */}
            <ellipse cx="100" cy="235" rx="55" ry="5" fill="rgba(0,0,0,0.12)" />

            {/* Left Leg & Right Leg */}
            <rect x="75" y="180" width="16" height="36" rx="8" fill={skinTone} />
            <rect x="109" y="180" width="16" height="36" rx="8" fill={skinTone} />

            {/* Athletic Socks */}
            <rect x="74" y="198" width="18" height="14" rx="3" fill="#FFFFFF" />
            <line x1="74" y1="202" x2="92" y2="202" stroke="#2563EB" strokeWidth="2" />
            <rect x="108" y="198" width="18" height="14" rx="3" fill="#FFFFFF" />
            <line x1="108" y1="202" x2="126" y2="202" stroke="#2563EB" strokeWidth="2" />

            {/* Left Sneaker */}
            <path
              d="M 66 218 C 66 210, 80 210, 93 218 L 96 230 C 96 233, 62 233, 62 230 Z"
              fill={shoesColor}
            />
            <rect x="62" y="228" width="35" height="4" rx="2" fill="#FFFFFF" />
            <line x1="72" y1="219" x2="84" y2="219" stroke="#FFFFFF" strokeWidth="2" />

            {/* Right Sneaker */}
            <path
              d="M 107 218 C 120 210, 134 210, 134 218 L 138 230 C 138 233, 104 233, 104 230 Z"
              fill={shoesColor}
            />
            <rect x="103" y="228" width="35" height="4" rx="2" fill="#FFFFFF" />
            <line x1="116" y1="219" x2="128" y2="219" stroke="#FFFFFF" strokeWidth="2" />

            {/* Sporty Shorts */}
            <path
              d="M 68 152 L 132 152 L 130 185 L 103 185 L 100 172 L 97 185 L 70 185 Z"
              fill={shortsColor}
            />
            {/* White side stripes on shorts */}
            <line x1="72" y1="154" x2="73" y2="183" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
            <line x1="128" y1="154" x2="127" y2="183" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
          </g>
        )}

        {/* --- UPPER BODY (Jersey, Arms, Neck) --- */}
        {showBody && (
          <g id="upper-body">
            {/* Neck */}
            <rect x="88" y="98" width="24" height="24" rx="6" fill={skinTone} />

            {/* Left Arm & Wristband */}
            <path d="M 64 116 L 46 150 C 44 154, 48 158, 52 156 L 68 132 Z" fill={skinTone} />
            {/* Left Hand thumbs up / fist */}
            <circle cx="46" cy="155" r="9" fill={skinTone} />
            <path d="M 44 148 Q 41 143 45 140 Q 48 143 46 148" fill={skinTone} />

            {/* Right Arm */}
            <path d="M 136 116 L 154 150 C 156 154, 152 158, 148 156 L 132 132 Z" fill={skinTone} />
            <circle cx="154" cy="155" r="9" fill={skinTone} />

            {/* Wristband accessory */}
            {accessory === 'wristband' && (
              <>
                <rect x="44" y="146" width="12" height="6" rx="2" fill="#FACC15" />
                <rect x="144" y="146" width="12" height="6" rx="2" fill="#FACC15" />
              </>
            )}

            {/* Jersey Body */}
            <path
              d="M 60 114 L 140 114 L 133 162 L 67 162 Z"
              fill={jerseyColor}
            />

            {/* Jersey Sleeves */}
            <path d="M 60 114 L 46 130 L 58 138 L 70 120 Z" fill={jerseyColor} />
            <path d="M 140 114 L 154 130 L 142 138 L 130 120 Z" fill={jerseyColor} />

            {/* Jersey Patterns */}
            {jerseyPattern === 'stripes' && (
              <>
                <rect x="76" y="114" width="7" height="48" fill="#FFFFFF" opacity="0.3" />
                <rect x="96.5" y="128" width="7" height="34" fill="#FFFFFF" opacity="0.3" />
                <rect x="117" y="114" width="7" height="48" fill="#FFFFFF" opacity="0.3" />
              </>
            )}

            {jerseyPattern === 'lightning' && (
              <path
                d="M 103 118 L 94 134 L 102 134 L 97 150 L 109 132 L 101 132 Z"
                fill="#FDE047"
                stroke="#CA8A04"
                strokeWidth="1"
              />
            )}

            {/* Jersey V-Neck Collar */}
            <polygon points="86,114 114,114 100,128" fill="#FFFFFF" />

            {/* Big Jersey Number # */}
            <rect x="85" y="132" width="30" height="22" rx="4" fill="#FFFFFF" opacity="0.9" />
            <text
              x="100"
              y="149"
              textAnchor="middle"
              fill={jerseyColor}
              fontSize="17"
              fontWeight="900"
              fontFamily="Outfit, sans-serif"
            >
              {jerseyNumber}
            </text>

            {/* Gold Medal Accessory */}
            {accessory === 'gold-medal' && (
              <g id="accessory-medal">
                {/* Blue ribbon */}
                <path d="M 88 116 L 100 138 L 112 116" stroke="#1D4ED8" strokeWidth="4" fill="none" />
                {/* Shiny Gold Medal */}
                <circle cx="100" cy="140" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
                <circle cx="100" cy="140" r="7" fill="#FBBF24" />
                <text x="100" y="144" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="900">★</text>
              </g>
            )}

            {/* Referee Whistle Accessory */}
            {accessory === 'referee-whistle' && (
              <g id="accessory-whistle">
                <path d="M 90 116 L 100 134 L 110 116" stroke="#EF4444" strokeWidth="3" fill="none" />
                <circle cx="100" cy="136" r="6" fill="#1E293B" />
                <rect x="103" y="134" width="7" height="4" rx="1" fill="#1E293B" />
              </g>
            )}
          </g>
        )}

        {/* --- HEAD & FACE --- */}
        <g id="head-and-face">
          {/* Ears */}
          <circle cx="58" cy="68" r="11" fill={skinTone} />
          <circle cx="58" cy="68" r="6" fill="#F59E0B" opacity="0.3" />
          <circle cx="142" cy="68" r="11" fill={skinTone} />
          <circle cx="142" cy="68" r="6" fill="#F59E0B" opacity="0.3" />

          {/* Head Base */}
          <circle cx="100" cy="66" r="42" fill={skinTone} />

          {/* Cheeks Blush */}
          <ellipse cx="76" cy="74" rx="7" ry="4" fill="#F87171" opacity="0.35" />
          <ellipse cx="124" cy="74" rx="7" ry="4" fill="#F87171" opacity="0.35" />

          {/* Freckles for cute boy look */}
          <circle cx="74" cy="73" r="1" fill="#D97706" opacity="0.6" />
          <circle cx="78" cy="75" r="1" fill="#D97706" opacity="0.6" />
          <circle cx="122" cy="73" r="1" fill="#D97706" opacity="0.6" />
          <circle cx="126" cy="75" r="1" fill="#D97706" opacity="0.6" />

          {/* Eyes based on expression */}
          {expression === 'wink' ? (
            <>
              {/* Left Eye: Open & Sparkling */}
              <ellipse cx="80" cy="63" rx="7" ry="9" fill="#FFFFFF" />
              <circle cx="81" cy="63" r="5.5" fill="#1E293B" />
              <circle cx="80" cy="61" r="2" fill="#FFFFFF" />
              {/* Right Eye: Cute Wink Arc */}
              <path d="M 114 65 Q 120 58 126 65" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : expression === 'excited' ? (
            <>
              {/* Excited Arc Eyes (Smiling squint) */}
              <path d="M 74 65 Q 81 56 88 65" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 112 65 Q 119 56 126 65" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Standard Happy Sparkling Eyes */}
              <ellipse cx="80" cy="63" rx="7" ry="9" fill="#FFFFFF" />
              <circle cx="81" cy="63" r="5.5" fill="#1E293B" />
              <circle cx="79" cy="61" r="2" fill="#FFFFFF" />
              <circle cx="83" cy="65" r="1" fill="#FFFFFF" />

              <ellipse cx="120" cy="63" rx="7" ry="9" fill="#FFFFFF" />
              <circle cx="121" cy="63" r="5.5" fill="#1E293B" />
              <circle cx="119" cy="61" r="2" fill="#FFFFFF" />
              <circle cx="123" cy="65" r="1" fill="#FFFFFF" />
            </>
          )}

          {/* Eyebrows */}
          <path d="M 73 51 Q 81 47 88 51" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 112 51 Q 119 47 127 51" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Cute Nose */}
          <path d="M 100 68 Q 103 72 100 74" stroke="#D97706" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Smiling Mouth */}
          <path
            d="M 87 79 Q 100 96 113 79"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.5"
          />
          {/* Tongue highlight */}
          <path d="M 93 88 Q 100 95 107 88" fill="#F87171" />

          {/* Cool Sunglasses Accessory */}
          {accessory === 'cool-sunglasses' && (
            <g id="accessory-glasses">
              {/* Frame */}
              <rect x="68" y="55" width="26" height="18" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <rect x="106" y="55" width="26" height="18" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <rect x="94" y="59" width="12" height="4" fill="#0F172A" />
              {/* Mirror shine */}
              <line x1="72" y1="58" x2="88" y2="69" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <line x1="110" y1="58" x2="126" y2="69" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </g>
          )}
        </g>

        {/* --- HAIR & HEADWEAR --- */}
        <g id="hair-and-headwear">
          {headwear === 'spiky-hair' && (
            <g id="spiky-hair">
              {/* Spikes on top */}
              <path
                d="M 60 55 L 68 28 L 78 45 L 90 22 L 102 42 L 115 18 L 126 44 L 138 32 L 140 55 C 130 35, 70 35, 60 55 Z"
                fill={hairColor}
              />
              {/* Sideburns */}
              <polygon points="58,55 54,72 63,65" fill={hairColor} />
              <polygon points="142,55 146,72 137,65" fill={hairColor} />
            </g>
          )}

          {headwear === 'curly-hair' && (
            <g id="curly-hair">
              <circle cx="68" cy="40" r="16" fill={hairColor} />
              <circle cx="86" cy="30" r="18" fill={hairColor} />
              <circle cx="106" cy="28" r="18" fill={hairColor} />
              <circle cx="126" cy="34" r="17" fill={hairColor} />
              <circle cx="138" cy="48" r="14" fill={hairColor} />
              <circle cx="60" cy="50" r="14" fill={hairColor} />
            </g>
          )}

          {headwear === 'headband' && (
            <g id="headband">
              {/* Hair tufts peeking above headband */}
              <path
                d="M 65 48 L 75 28 L 88 42 L 100 24 L 112 40 L 125 28 L 135 48 Z"
                fill={hairColor}
              />
              {/* Athletic Headband */}
              <rect x="56" y="44" width="88" height="14" rx="7" fill={headwearColor} stroke="#1E293B" strokeWidth="1.5" />
              <line x1="56" y1="51" x2="144" y2="51" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            </g>
          )}

          {headwear === 'cap-backward' && (
            <g id="cap-backward">
              {/* Hair strands poking out at front */}
              <path d="M 65 58 Q 80 50 95 56 Q 105 48 120 54 Q 132 49 136 58" stroke={hairColor} strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Cap Dome */}
              <path
                d="M 62 48 C 62 20, 138 20, 138 48 C 138 52, 62 52, 62 48 Z"
                fill={headwearColor}
                stroke="#0F172A"
                strokeWidth="2"
              />
              {/* Back snapback strap & backwards visor */}
              <ellipse cx="100" cy="48" rx="22" ry="7" fill={headwearColor} stroke="#0F172A" strokeWidth="2" />
              <path d="M 88 47 Q 100 42 112 47" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              {/* Little top button */}
              <circle cx="100" cy="24" r="4" fill="#FACC15" />
            </g>
          )}

          {headwear === 'cap-forward' && (
            <g id="cap-forward">
              {/* Cap Dome */}
              <path
                d="M 63 50 C 63 22, 137 22, 137 50 Z"
                fill={headwearColor}
                stroke="#0F172A"
                strokeWidth="2"
              />
              {/* Front Curved Visor */}
              <path
                d="M 54 52 Q 100 38 146 52 Q 100 66 54 52 Z"
                fill={headwearColor}
                stroke="#0F172A"
                strokeWidth="2"
              />
              <path d="M 66 52 Q 100 44 134 52" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
              <circle cx="100" cy="24" r="4" fill="#FACC15" />
            </g>
          )}

          {headwear === 'helmet' && (
            <g id="racing-helmet">
              {/* Full Formula Racing Helmet */}
              <path
                d="M 54 62 C 54 18, 146 18, 146 62 C 146 86, 138 96, 126 96 L 74 96 C 62 96, 54 86, 54 62 Z"
                fill={headwearColor}
                stroke="#0F172A"
                strokeWidth="3"
              />
              {/* Racing Decals on Helmet */}
              <path d="M 70 30 L 130 30 L 126 40 L 74 40 Z" fill="#FACC15" />
              {/* Helmet Visor Shield (Open tinted visor showing happy eyes) */}
              <path
                d="M 64 54 C 64 50, 136 50, 136 54 C 136 74, 64 74, 64 54 Z"
                fill="none"
                stroke="#0F172A"
                strokeWidth="4"
              />
              <rect x="62" y="70" width="76" height="5" rx="2" fill="#0F172A" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
