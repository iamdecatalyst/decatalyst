import { useState, useEffect } from 'react';

const phrases = [
  'Ad astra per aspera',
  'Through hardship to the stars',
  'The empire rises',
  'My hypothesis is death ain\'t shit',
  'Refactoring chaos into clean logic',
];

export default function TypeWriter() {
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
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <span className="font-mono text-sm text-neutral-500">
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className="animate-blink text-copper">|</span>
    </span>
  );
}
