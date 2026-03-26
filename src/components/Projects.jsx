const projects = [
  {
    num: '01',
    badge: '🏆 2nd Prize – University Expo',
    badgeClass: 'award',
    title: 'Smart Home Automation System',
    period: 'Jan 2024 – May 2024 · Developer',
    desc: 'Designed and implemented an IoT-based automation system using Arduino, ESP8266, and sensor modules, with mobile and voice-based controls for real-time system interaction.',
    bullets: [
      'Control logic for automated appliances—reliable, efficient & responsive',
      'Integrated mobile & voice-based controls for real-time interaction',
      'Awarded 2nd Prize at University-Level Project Expo',
    ],
    tech: ['Arduino', 'ESP8266', 'IoT', 'C++'],
  },
  {
    num: '02',
    badge: '🌐 Web + IoT Concept',
    badgeClass: '',
    title: 'Umbrella Rental System',
    period: '2025 · Developer',
    desc: 'A QR-based umbrella rental platform emphasising scalability and clean system architecture, with a React frontend and modular mock API backend.',
    bullets: [
      'QR-based check-in/check-out flow for fully automated rentals',
      'Responsive frontend built with React Framework',
      'Simulated backend workflows using mock APIs',
    ],
    tech: ['React', 'REST API', 'QR Code', 'IoT'],
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
