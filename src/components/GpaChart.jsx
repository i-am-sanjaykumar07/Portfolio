import { useEffect, useRef, useState } from 'react';

const semesters = [
  { label: 'Sem 1', sgpa: 8.00 },
  { label: 'Sem 2', sgpa: 7.74 },
  { label: 'Sem 3', sgpa: 7.57 },
  { label: 'Sem 4', sgpa: 8.15 },
  { label: 'Sem 5', sgpa: 7.89 },
  { label: 'Sem 6', sgpa: 8.50 },
];

const CGPA    = 7.96;
const W       = 360;   // SVG viewBox width
const H       = 130;   // SVG viewBox height
const PAD     = { top: 16, right: 40, bottom: 24, left: 28 };

const MIN_Y   = 7.0;
const MAX_Y   = 9.0;

function toSvgX(i)    { return PAD.left + (i / (semesters.length - 1)) * (W - PAD.left - PAD.right); }
function toSvgY(val)  { return PAD.top  + (1 - (val - MIN_Y) / (MAX_Y - MIN_Y)) * (H - PAD.top - PAD.bottom); }

/* Smooth cubic bezier path through points */
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cpx = (x0 + x1) / 2;
    d += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

export default function GpaChart() {
  const wrapRef   = useRef(null);
  const pathRef   = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null); // index of hovered point

  /* Intersection observer → trigger line draw animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  /* Animate stroke-dashoffset after visible */
  useEffect(() => {
    if (!visible || !pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray  = len;
    pathRef.current.style.strokeDashoffset = len;
    // Force reflow
    pathRef.current.getBoundingClientRect();
    pathRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)';
    pathRef.current.style.strokeDashoffset = '0';
  }, [visible]);

  const pts       = semesters.map((s, i) => [toSvgX(i), toSvgY(s.sgpa)]);
  const linePath  = smoothPath(pts);

  /* Area fill path */
  const areaPath  = linePath
    + ` L ${pts[pts.length - 1][0]} ${H - PAD.bottom}`
    + ` L ${pts[0][0]} ${H - PAD.bottom} Z`;

  const cgpaY     = toSvgY(CGPA);

  /* Y-axis tick values */
  const yTicks    = [7.5, 8.0, 8.5];

  return (
    <div className="gpa-chart-wrapper" ref={wrapRef}>
      {/* Header */}
      <div className="gpa-chart-header">
        <span className="gpa-chart-title">SGPA <span className="accent">Trend</span></span>
        <div className="cgpa-badge">
          <span className="cgpa-label">CGPA</span>
          <span className="cgpa-value">{CGPA}</span>
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="gpa-svg-container">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="gpa-line-svg"
          aria-label="SGPA line graph"
        >
          <defs>
            {/* Line gradient */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#7c3aed" />
              <stop offset="50%"  stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* Area fill gradient */}
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"    />
            </linearGradient>

            {/* Glow filter for points */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Clip path to reveal line left → right */}
            <clipPath id="lineClip">
              <rect x={PAD.left} y="0" width={W - PAD.left - PAD.right} height={H} />
            </clipPath>
          </defs>

          {/* ── Grid lines ── */}
          {yTicks.map(v => {
            const y = toSvgY(v);
            return (
              <g key={v}>
                <line
                  x1={PAD.left} y1={y}
                  x2={W - PAD.right} y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 4} y={y + 3}
                  textAnchor="end"
                  fontSize="7"
                  fill="rgba(139,148,158,0.7)"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {v.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* ── X-axis labels ── */}
          {semesters.map((s, i) => (
            <text
              key={s.label}
              x={toSvgX(i)}
              y={H - PAD.bottom + 13}
              textAnchor="middle"
              fontSize="7"
              fill="rgba(139,148,158,0.8)"
              fontFamily="'JetBrains Mono', monospace"
            >
              {s.label}
            </text>
          ))}

          {/* ── CGPA baseline ── */}
          <line
            x1={PAD.left} y1={cgpaY}
            x2={W - PAD.right} y2={cgpaY}
            stroke="rgba(124,58,237,0.55)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <text
            x={W - PAD.right + 2} y={cgpaY + 3}
            fontSize="7"
            fill="rgba(167,139,250,0.85)"
            fontFamily="'JetBrains Mono', monospace"
          >
            {CGPA}
          </text>

          {/* ── Area fill (static, fades in) ── */}
          <path
            d={areaPath}
            fill="url(#areaGrad)"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.8s ease 1.2s',
            }}
          />

          {/* ── Main line (animated draw) ── */}
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ── Data points ── */}
          {pts.map(([x, y], i) => {
            const isHov = hovered === i;
            const isHigh = semesters[i].sgpa >= CGPA;
            return (
              <g key={i}>
                {/* Outer pulse ring on hover */}
                {isHov && (
                  <circle
                    cx={x} cy={y} r="8"
                    fill={isHigh ? 'rgba(0,212,255,0.12)' : 'rgba(124,58,237,0.12)'}
                    style={{ animation: 'gpaPulse 1s ease-out infinite' }}
                  />
                )}

                {/* Hit area (invisible, larger) */}
                <circle
                  cx={x} cy={y} r="10"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />

                {/* Visible dot */}
                <circle
                  cx={x} cy={y}
                  r={isHov ? 5 : 3}
                  fill={isHigh ? '#00d4ff' : '#7c3aed'}
                  stroke={isHigh ? 'rgba(0,212,255,0.4)' : 'rgba(124,58,237,0.4)'}
                  strokeWidth="2"
                  filter="url(#glow)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.8 + i * 0.12}s, r 0.2s ease`,
                    cursor: 'pointer',
                    pointerEvents: 'none',
                  }}
                />

                {/* Tooltip on hover */}
                {isHov && (
                  <g>
                    <rect
                      x={x - 18} y={y - 22}
                      width="36" height="15"
                      rx="3"
                      fill="#0f1923"
                      stroke={isHigh ? 'rgba(0,212,255,0.4)' : 'rgba(124,58,237,0.4)'}
                      strokeWidth="1"
                    />
                    <text
                      x={x} y={y - 12}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="700"
                      fill={isHigh ? '#00d4ff' : '#a78bfa'}
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {semesters[i].sgpa.toFixed(2)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Compact legend */}
      <div className="gpa-legend">
        <div className="gpa-legend-item"><span className="gpa-legend-dot gpa-legend-dot--high" /><span>Above</span></div>
        <div className="gpa-legend-item"><span className="gpa-legend-dot gpa-legend-dot--low" /><span>Below</span></div>
        <div className="gpa-legend-item"><span className="gpa-legend-line" /><span>CGPA line</span></div>
      </div>
    </div>
  );
}
