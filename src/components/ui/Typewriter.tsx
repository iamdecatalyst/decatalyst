import { useState, useEffect, useRef } from 'react';

interface TypewriterLine {
  text: string;
  className?: string;
}

interface TypewriterProps {
  lines: TypewriterLine[];
  speed?: number;
  lineDelay?: number;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({ lines, speed = 30, lineDelay = 100, onComplete, className = '' }: TypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [completed, setCompleted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || completed) return;

    if (currentLine >= lines.length) {
      setCompleted(true);
      onComplete?.();
      return;
    }

    const line = lines[currentLine];
    if (currentChar >= line.text.length) {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentChar((c) => c + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [started, completed, currentLine, currentChar, lines, speed, lineDelay, onComplete]);

  return (
    <div ref={ref} className={`font-mono text-sm leading-relaxed ${className}`}>
      {lines.slice(0, currentLine + 1).map((line, i) => (
        <div key={i} className={line.className || 'text-neutral-400'}>
          {i < currentLine ? line.text : line.text.slice(0, currentChar)}
          {i === currentLine && !completed && (
            <span className="animate-blink text-green-400">_</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Simple rotating typewriter for Hero section
interface RotatingTypewriterProps {
  phrases: string[];
  className?: string;
}

export function RotatingTypewriter({ phrases, className = '' }: RotatingTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => setIsDeleting(true), 2500);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <span className={`font-mono text-sm text-neutral-500 ${className}`}>
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className="animate-blink text-copper">|</span>
    </span>
  );
}
