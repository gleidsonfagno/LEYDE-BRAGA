'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: 'hero-perfumaria',
    href: '/categoria?cat=perfumaria',
    image: '/assets/images/banners/hero-1.jpg',
    alt: 'Perfumaria',
  },
  {
    id: 'hero-corpo-banho',
    href: '/categoria?cat=corpo-e-banho',
    image: '/assets/images/banners/hero-2.jpg',
    alt: 'Corpo e Banho',
  },
  {
    id: 'hero-maquiagem',
    href: '/categoria?cat=maquiagem',
    image: '/assets/images/banners/hero-3.jpg',
    alt: 'Maquiagem',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    const play = () => {
      stop();
      timerRef.current = setInterval(() => {
        setCurrentSlide((previous) => (previous + 1) % slides.length);
      }, 5200);
    };

    play();

    const node = rootRef.current;
    if (node) {
      node.addEventListener('mouseenter', stop);
      node.addEventListener('mouseleave', play);
    }

    return () => {
      stop();
      if (node) {
        node.removeEventListener('mouseenter', stop);
        node.removeEventListener('mouseleave', play);
      }
    };
  }, []);

  return (
    <section className="hero container" id="hero" ref={rootRef} data-od-id="hero">
      <div className="hero-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="hero-slide">
            <Link href={slide.href} data-od-id={slide.id}>
              <img src={slide.image} alt={slide.alt} fetchPriority={index === 0 ? 'high' : 'auto'} />
            </Link>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Ir para slide ${index + 1}`}
            className={index === currentSlide ? 'ativo' : ''}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
