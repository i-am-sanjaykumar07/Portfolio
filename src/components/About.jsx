export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About <span className="accent">Me</span></h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a passionate <strong>Information Security</strong> student at Chandigarh University,
              building strong skills in programming with <strong>C++ and Bash</strong>. I'm currently
              learning Full-Stack Development (MERN) to create secure and scalable applications.
            </p>
            <p>
              I'm also building a <strong>stealth startup</strong>, combining technical skills with
              innovation. Always eager to learn, collaborate, and contribute to impactful projects.
            </p>
            <div className="about-tags">
              <span className="tag">🔐 Cybersecurity</span>
              <span className="tag">💻 Full-Stack Dev</span>
              <span className="tag">🚀 Startup Builder</span>
              <span className="tag">🎓 CSE'27</span>
            </div>
          </div>
          <div className="about-info">
            <div className="info-card">
              {[
                ['Location', 'Piduguralla, AP, India'],
                ['University', 'Chandigarh University'],
                ['CGPA', '7.85'],
                ['Batch', '2023 – 2027'],
                ['Role', 'Active Member – Cypherlock Club'],
                ['Status', 'Registered ISC2 Candidate'],
              ].map(([label, val]) => (
                <div className="info-row" key={label}>
                  <span className="info-label">{label}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
