import { useEffect, useRef } from 'react';
import GpaChart from './GpaChart';

const items = [
  {
    period: 'Aug 2023 – May 2027',
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Chandigarh University, Mohali',
    detail: <>Specialization in Information Security &nbsp;·&nbsp; <strong>CGPA: 7.96</strong></>,
    chart: true,   // ← render chart inside this card
  },
  {
    period: 'Sep 2021 – Mar 2023',
    degree: 'Intermediate (BIEAP)',
    institution: 'Narayana Junior College, Vijayawada',
    detail: <>Mathematics, Physics, Chemistry &nbsp;·&nbsp; <strong>94.5%</strong></>,
  },
  {
    period: 'Nov 2020 – Apr 2021',
    degree: 'Matriculation (BSEAP)',
    institution: 'Oxford School, Narasaraopeta',
    detail: <><strong>100%</strong> — Perfect Score</>,
  },
];

export default function Education() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Education <span className="accent">Timeline</span></h2>
        <div className="timeline">
          {items.map((item, i) => (
            <div className="timeline-item reveal" key={item.period} ref={el => refs.current[i] = el}>
              <div className="timeline-dot" />
              <div className="timeline-content card">
                {/* Card top row: text info + chart side by side */}
                <div className={item.chart ? 'edu-card-row' : ''}>
                  <div className="edu-card-text">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.degree}</h3>
                    <p className="timeline-institution">{item.institution}</p>
                    <p className="timeline-detail">{item.detail}</p>
                  </div>
                  {item.chart && (
                    <div className="edu-card-chart">
                      <GpaChart />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
