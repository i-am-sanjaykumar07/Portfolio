import { useEffect, useRef, useState } from 'react';

const roles = [
  'Cybersecurity Enthusiast',
  'Full-Stack Developer (MERN)',
  'IoT Systems Builder',
  'ISC2 Candidate',
  'Startup Builder 🚀',
];

function useTypedRole() {
  const [text, setText] = useState('');
  const stateRef = useRef({ roleIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const s = stateRef.current;
      const current = roles[s.roleIdx];
      if (!s.deleting) {
        setText(current.substring(0, s.charIdx + 1));
        s.charIdx++;
        if (s.charIdx === current.length) {
          s.deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
      } else {
        setText(current.substring(0, s.charIdx - 1));
        s.charIdx--;
        if (s.charIdx === 0) {
          s.deleting = false;
          s.roleIdx = (s.roleIdx + 1) % roles.length;
        }
      }
      timer = setTimeout(tick, s.deleting ? 50 : 80);
    }
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

function useCounter(target, start) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!start) return;
    const step = Math.ceil(target / 30);
    const id = setInterval(() => {
      setCount(c => {
        const next = Math.min(c + step, target);
        if (next >= target) clearInterval(id);
        return next;
      });
    }, 40);
    return () => clearInterval(id);
  }, [target, start]);
  return count;
}

export default function Hero() {
  const typedRole = useTypedRole();
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setStatsStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // SVG ring gradient via JS (same as original)
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ns = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(ns, 'defs');
    const grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', 'ringGrad');
    grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
    const s1 = document.createElementNS(ns, 'stop');
    s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#00d4ff');
    const s2 = document.createElementNS(ns, 'stop');
    s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#7c3aed');
    grad.appendChild(s1); grad.appendChild(s2);
    defs.appendChild(grad);
    svg.insertBefore(defs, svg.firstChild);
  }, []);

  const projects = useCounter(3, statsStarted);
  const certs    = useCounter(6, statsStarted);
  const techs    = useCounter(7, statsStarted);

  return (
    <section id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, World! I'm</p>
        <h1 className="hero-name">
          Palisetty<br /><span className="accent">Sanjay Kumar</span>
        </h1>
        <div className="hero-roles">
          <span id="typed-role">{typedRole}</span>
          <span className="cursor-blink">|</span>
        </div>
        <p className="hero-bio">
          Passionate about <span className="highlight">Cybersecurity</span> &amp; building{' '}
          <span className="highlight">Full-Stack</span> applications.
          CSE'27 @ Chandigarh University · Aspiring entrepreneur · ISC2 Candidate.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get In Touch
          </a>
        </div>
        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-num">{projects}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">{certs}</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">{techs}+</span>
            <span className="stat-label">Technologies</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="avatar-ring">
          <div className="avatar-inner">
            <span className="avatar-initials">PSK</span>
          </div>
          <svg className="ring-svg" viewBox="0 0 200 200" ref={svgRef}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#ringGrad)" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
          <div className="orbit orbit-1"><div className="orbit-dot" /></div>
          <div className="orbit orbit-2"><div className="orbit-dot dot-2" /></div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
