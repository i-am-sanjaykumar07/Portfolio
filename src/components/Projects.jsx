const projects = [
  {
    num: '01',
    badge: '🏆 2nd Prize – University Expo',
    badgeClass: 'award',
    title: 'Smart Home Automation System',
    period: 'Jan 2024 – May 2024 · Developer',
    desc: 'Developed an IoT-based home automation system using Arduino, ESP8266, and sensor modules, securing 2nd prize at the University Project Expo.',
    bullets: [
      'Developed an IoT-based home automation system using Arduino, ESP8266, and sensor modules.',
      'Implemented wireless device control and sensor-based automation for real-time operations.',
      'Integrated hardware components and optimized communication between IoT devices.',
      'Secured 2nd Prize at University-Level Project Expo for innovative IoT implementation.',
    ],
    tech: ['Arduino', 'ESP8266', 'IoT', 'C++'],
  },
  {
    num: '02',
    badge: '🌐 Web + IoT Concept',
    badgeClass: '',
    title: 'Umbrella Rental System',
    period: '2025 · Product Designer & Developer',
    desc: 'Designed a QR-based smart umbrella rental platform (RainShield) combining React web technology with IoT concepts.',
    bullets: [
      'Designed a QR-based smart umbrella rental platform combining web technology with IoT concepts.',
      'Developed responsive user interfaces using React.js and modern frontend technologies.',
      'Implemented API-based workflows to simulate rental operations and user interactions.',
      'Designed a scalable system architecture focusing on accessibility and user convenience.',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'IoT'],
    link: 'https://rain-shield.vercel.app',
  },
  {
    num: '03',
    badge: '📊 MERN Full Stack',
    badgeClass: '',
    title: 'Placement Tracker System',
    period: '2026 · Full Stack Developer',
    desc: 'Developed a MERN-based placement management system for student and company drive tracking with dynamic status reporting.',
    bullets: [
      'Developed a MERN-based placement management system for student and company drive tracking.',
      'Built responsive frontend components using React.js for improved user experience.',
      'Designed REST APIs and integrated MongoDB for authentication and data management.',
      'Implemented structured workflows to simplify placement application monitoring.',
    ],
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'REST API'],
    link: 'https://placement96.vercel.app',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured <span className="accent">Projects</span></h2>
        <div className="projects-grid">
          {projects.map(p => (
            <div className="project-card card" key={p.num}>
              <div className="project-header">
                <div className="project-num">{p.num}</div>
                <div className={`project-badge${p.badgeClass ? ' ' + p.badgeClass : ''}`}>{p.badge}</div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-period">{p.period}</p>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-bullets">
                {p.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <div className="project-tech">
                {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
              </div>
              {p.link && (
                <div style={{ marginTop: '1rem', paddingTop: '0.5rem' }}>
                  <a 
                    href={p.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-mono)' }}
                  >
                    Live Demo ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
