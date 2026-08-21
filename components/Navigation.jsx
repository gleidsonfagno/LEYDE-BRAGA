'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LEYDE } from '../lib/config';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (event) => {
    if (event.target.closest('.dropdown a')) return;
    setIsOpen((value) => !value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((value) => !value);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <nav className="site-nav" aria-label="Categorias" ref={dropdownRef}>
      <div className="container">
        <Link href="/">Início</Link>
        {LEYDE.categorias.map((categoria) => (
          <Link key={categoria.id} href={`/categoria?cat=${categoria.id}`}>
            {categoria.nome}
          </Link>
        ))}
        <span
          className={`has-sub ${isOpen ? 'aberto' : ''}`}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
        >
          Marcas
          <span className="dropdown">
            {LEYDE.marcas.map((marca) => (
              <Link
                key={marca}
                href={`/categoria?marca=${encodeURIComponent(marca)}`}
                onClick={() => setIsOpen(false)}
              >
                {marca}
              </Link>
            ))}
          </span>
        </span>
      </div>
    </nav>
  );
}
