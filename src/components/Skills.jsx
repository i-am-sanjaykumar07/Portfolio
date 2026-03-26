import { useEffect, useRef } from 'react';

const skillData = [
  { icon: '⌨️', title: 'Programming Languages', pills: ['Python', 'C++', 'JavaScript', 'SQL'] },
  { icon: '🌐', title: 'Web & Software Dev',    pills: ['HTML', 'CSS', 'React', 'Node.js', 'RESTful APIs', 'MERN Stack'] },
  { icon: '🧠', title: 'CS Fundamentals',        pills: ['DSA', 'OOP', 'Problem Solving'] },
  { icon: '🤝', title: 'Soft Skills',            pills: ['Logical Thinking', 'Team Work', 'Communication', 'Adaptability'] },
  { icon: '🔧', title: 'Hardware & IoT',          pills: ['Arduino', 'ESP8266', 'Sensors', 'IoT Protocols'] },
  { icon: '🛡️', title: 'Security',               pills: ['Security Ops', 'ISC2', 'SOC Analysis', 'Cybersecurity'] },
];

function SkillCard({ icon, title, pills }) {
  const ref = useRef(null);

  // 3D tilt effect
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div className="skill-category card" ref={ref}>
      <div className="skill-icon">{icon}</div>
      <h3>{title}</h3>
      <div className="skill-pills">
        {pills.map(p => <span className="pill" key={p}>{p}</span>)}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Technical <span className="accent">Skills</span></h2>
        <div className="skills-grid">
          {skillData.map(s => <SkillCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}
