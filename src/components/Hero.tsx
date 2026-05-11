import { Box, Button } from '@mui/material';
import { Instagram, LinkedIn, GitHub, Twitter, Download } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';

// Only these cycle — "I'm Moaz Javed," stays static above
const ROLES = [
  'a Full-Stack Web Developer',
  'a MERN Stack Developer',
  'an Ecommerce Specialist',
  'a UI/UX Enthusiast',
];

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx]     = useState(0);
  const [typing, setTyping]       = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIdx];

    const schedule = (fn: () => void, ms: number) => {
      timerRef.current = setTimeout(fn, ms);
    };

    if (typing) {
      if (displayed.length < current.length) {
        schedule(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
      } else {
        schedule(() => setTyping(false), 2000); // pause before erasing
      }
    } else {
      if (displayed.length > 0) {
        schedule(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [displayed, typing, roleIdx]);

  const handleDownloadCV = async () => {
    try {
      const res = await fetch('/api/download-cv');
      if (!res.ok) { alert('CV not available yet.'); return; }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'Moaz_Javed_CV.pdf'; a.click();
      window.URL.revokeObjectURL(url);
    } catch { alert('Failed to download CV.'); }
  };

  return (
    <Box id="home" className="hero-section-new">
      {/* Floating particles */}
      <Box className="hero-bg-anim">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </Box>

      <Box className="hero-content">
        {/* ── LEFT ── */}
        <Box className="hero-left">

          {/* Static name line */}
          <p className="hero-static-name">
            I&apos;m <span className="hero-name-highlight">Moaz Javed,</span>
          </p>

          {/* Typewriter role line */}
          <Box className="typewriter-container">
            <span className="typewriter-text">{displayed}</span>
            <span className="cursor">|</span>
          </Box>

          <p className="hero-sub">
            Passionate Full-Stack Web Developer with a strong focus on building
            responsive and scalable web applications.
          </p>

          <Box className="social-icons">
            {[
              { href: 'https://instagram.com/moaz_mughal',icon: <Instagram /> },
              { href: 'https://linkedin.com/in/moaz-mughal', icon: <LinkedIn /> },
              { href: 'https://github.com/MoazMughal',  icon: <GitHub /> },
              { href: 'https://twitter.com',            icon: <Twitter /> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon">
                {s.icon}
              </a>
            ))}
          </Box>

          <Box className="hero-buttons">
            <Button variant="contained" className="hire-btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Hire Me
            </Button>
            <Button variant="outlined" className="download-btn" startIcon={<Download />} onClick={handleDownloadCV}>
              Download CV
            </Button>
          </Box>
        </Box>

        {/* ── RIGHT — profile image with animated rings ── */}
        <Box className="hero-right">
          <Box className="profile-ring-outer">
            <Box className="profile-ring-inner">
              <img src="/AboutMe.png" alt="Moaz Javed" className="profile-img" />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="scroll-indicator">
        <Box className="scroll-arrow" />
      </Box>
    </Box>
  );
}
