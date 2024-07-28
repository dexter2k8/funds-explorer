export interface ICountUpProps {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  locale?: (typeof locales)[number]["value"];
  prefix?: string;
  easingFunction?: keyof typeof easing;
}

export const easing = {
  // no easing, no acceleration
  linear: (t: number) => t,
  // accelerating from zero velocity
  easeInQuad: (t: number) => t * t,
  // decelerating to zero velocity
  easeOutQuad: (t: number) => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: (t: number) => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: (t: number) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: (t: number) => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  easeInQuint: (t: number) => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
  // exponential decelerating
  exp: (t: number) => 1 - Math.exp(-t * 7),
  gompertz: (t: number) => Math.exp(-30 * Math.exp(-13 * t)),
};

export const locales = [
  { value: "en-US", label: "English (United States)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "fr-FR", label: "French (France)" },
  { value: "es-ES", label: "Spanish (Spain)" },
  { value: "de-DE", label: "German (Germany)" },
  { value: "it-IT", label: "Italian (Italy)" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "ru-RU", label: "Russian (Russia)" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "ja-JP", label: "Japanese (Japan)" },
  { value: "ko-KR", label: "Korean (South Korea)" },
  { value: "ar-AE", label: "Arabic (United Arab Emirates)" },
  { value: "hi-IN", label: "Hindi (India)" },
  { value: "bn-BD", label: "Bengali (Bangladesh)" },
  { value: "tr-TR", label: "Turkish (Turkey)" },
  { value: "nl-NL", label: "Dutch (Netherlands)" },
  { value: "sv-SE", label: "Swedish (Sweden)" },
  { value: "da-DK", label: "Danish (Denmark)" },
  { value: "nb-NO", label: "Norwegian (Norway)" },
] as const;
