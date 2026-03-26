import { useState } from 'react';

const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '227fc958-0c63-4a90-8ce8-6739f502fbd5';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.phone.trim() || !/^[\d\s+\-(]{7,15}$/.test(fields.phone))
    errors.phone = 'Enter a valid phone number.';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address.';
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = 'Please write at least a brief message.';
  return errors;
}

export default function Contact() {
  const [fields, setFields]   = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState(null); // 'success' | 'error'

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = {
        ...fields,
        access_key: WEB3FORMS_ACCESS_KEY
      };

      const res = await fetch(WEB3FORMS_API_URL, {
        method:  'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        setFields({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const infoCards = [
    { href: 'mailto:palisettysanjaykumar@gmail.com', icon: '✉️', label: 'Email', value: 'palisettysanjaykumar@gmail.com' },
    { href: 'tel:+917416558162',                     icon: '📱', label: 'Phone', value: '+91 7416558162' },
    { href: 'https://linkedin.com/in/iam-sanjaykumar', icon: '🔗', label: 'LinkedIn', value: 'iam-sanjaykumar', external: true },
    { href: null,                                      icon: '📍', label: 'Location', value: 'Piduguralla, Guntur, AP – 522413' },
  ];

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Let's <span className="accent">Connect</span></h2>
        <p className="contact-sub">Want to collaborate, intern together, or just say hi? Drop your details and I'll get back to you!</p>

        <div className="contact-wrapper">
          {/* Info cards */}
          <div className="contact-info">
            {infoCards.map(c => (
              c.href
                ? <a key={c.label} href={c.href} className="contact-card card" target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener' : undefined}>
                    <div className="contact-icon">{c.icon}</div>
                    <div><h4>{c.label}</h4><span>{c.value}</span></div>
                  </a>
                : <div key={c.label} className="contact-card card">
                    <div className="contact-icon">{c.icon}</div>
                    <div><h4>{c.label}</h4><span>{c.value}</span></div>
                  </div>
            ))}
          </div>

          {/* Ping Me Form */}
          <form className="contact-form card" onSubmit={onSubmit} noValidate>
            <div className="form-header">
              <span className="form-tag">📬 Meeting Request</span>
              <h3>Ping Me</h3>
              <p>Fill in your details and I'll reach out to schedule a meeting.</p>
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="cf-name">Your Name <span className="req">*</span></label>
              <div className={`input-wrap${errors.name ? ' has-error' : ''}`}>
                <span className="input-icon">👤</span>
                <input id="cf-name" name="name" type="text" placeholder="e.g. Rahul Sharma"
                  value={fields.name} onChange={onChange} autoComplete="name" />
              </div>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Phone + Email row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-phone">Phone Number <span className="req">*</span></label>
                <div className={`input-wrap${errors.phone ? ' has-error' : ''}`}>
                  <span className="input-icon">📞</span>
                  <input id="cf-phone" name="phone" type="tel" placeholder="+91 98765 43210"
                    value={fields.phone} onChange={onChange} autoComplete="tel" />
                </div>
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cf-email">Email Address <span className="req">*</span></label>
                <div className={`input-wrap${errors.email ? ' has-error' : ''}`}>
                  <span className="input-icon">✉️</span>
                  <input id="cf-email" name="email" type="email" placeholder="you@example.com"
                    value={fields.email} onChange={onChange} autoComplete="email" />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="cf-message">What would you like to discuss? <span className="req">*</span></label>
              <div className={`input-wrap textarea-wrap${errors.message ? ' has-error' : ''}`}>
                <span className="input-icon top-icon">💬</span>
                <textarea id="cf-message" name="message" rows={4}
                  placeholder="Hi Sanjay, I'd like to discuss a collaboration opportunity..."
                  value={fields.message} onChange={onChange} />
              </div>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Meeting Request 🚀'}
            </button>

            {status === 'success' && (
              <div className="form-alert success">
                ✅ <strong>Done!</strong> Your request has been sent. Sanjay will get back to you soon!
              </div>
            )}
            {status === 'error' && (
              <div className="form-alert error">
                ❌ Something went wrong. Please try emailing directly at{' '}
                <a href="mailto:palisettysanjaykumar@gmail.com">palisettysanjaykumar@gmail.com</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
