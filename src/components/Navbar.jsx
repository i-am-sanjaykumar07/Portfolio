import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-brand">
        <span className="brand-bracket">&lt;</span>SK<span className="brand-bracket">/&gt;</span>
      </div>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <li key={l.id}>
            <button className={`nav-link${active === l.id ? ' active' : ''}`} onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
      <button className="hamburger" id="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
