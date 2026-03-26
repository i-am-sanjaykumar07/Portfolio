import { useEffect, useRef } from 'react';

const certs = [
  {
    issuerClass: 'cisco',
    issuer: 'Cisco',
    title: 'C++ Essentials',
    desc: 'Core C++ programming concepts, memory management & OOP fundamentals.',
  },
  {
    issuerClass: 'ibm',
    issuer: 'IBM',
    title: 'RDBMS (SQL)',
    desc: 'Relational database design and querying with SQL for industry-grade applications.',
  },
  {
    issuerClass: 'microsoft',
    issuer: 'Microsoft',
    title: 'Security Operations Analyst Associate (SC-200)',
    desc: 'Threat detection, SOC operations, and Microsoft Sentinel/Defender.',
  },
  {
    issuerClass: 'skillIndia',
    issuer: 'Skill India',
    title: 'AI for Entrepreneurship',
    desc: 'Leveraging AI tools to drive innovation and build startup ventures.',
  },
  {
    issuerClass: 'cisco',
    issuer: 'Cisco / NetAcad',
    title: 'Foundations of Cybersecurity',
    desc: 'Security fundamentals: CIA triad, threat vectors, and countermeasures.',
  },
  {
    issuerClass: 'python',
    issuer: 'Python / OOP',
    title: 'Advanced Python & OOP',
    desc: 'Level Up: Advanced Python + Python Practice: Object-Oriented Programming.',
  },
];

export default function Certifications() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <h2 className="section-title">Certifications &amp; <span className="accent">Achievements</span></h2>
        <div className="certs-grid">
          {certs.map((c, i) => (
            <div className="cert-card card reveal" key={c.title} ref={el => refs.current[i] = el}>
              <div className={`cert-issuer ${c.issuerClass}`}>{c.issuer}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="achievement-banner reveal" ref={el => refs.current[certs.length] = el}>
          <div className="achievement-icon">🏆</div>
          <div className="achievement-text">
            <h3>2nd Prize – University-Level Project Expo</h3>
            <p>Awarded for developing the IoT-based Smart Home Automation System at Chandigarh University.</p>
          </div>
        </div>

        <div className="roles-row">
          <div className="role-badge reveal" ref={el => refs.current[certs.length + 1] = el}>
            ⚡ Active Member – Cypherlock Club (Technology &amp; Innovation Society)
          </div>
          <div className="role-badge reveal" ref={el => refs.current[certs.length + 2] = el}>
            🛡️ Registered ISC2 Candidate
          </div>
        </div>
      </div>
    </section>
  );
}
