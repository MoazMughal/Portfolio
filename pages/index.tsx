import Head from 'next/head';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/Hero';
import About from '@/src/components/About';
import Projects from '@/src/components/Projects';
import Skills from '@/src/components/Skills';
import Contact from '@/src/components/Contact';
import Footer from '@/src/components/Footer';
import { Fab } from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Moaz Javed | Full Stack Developer</title>
        <meta name="description" content="Portfolio of Moaz Javed - Full Stack Web Developer" />
      </Head>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />

      {showTop && (
        <Fab
          size="medium"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed', bottom: 30, right: 30, zIndex: 999,
            background: '#ff6b35',
            color: 'white',
            '&:hover': { background: '#ff5722', transform: 'scale(1.1)' },
            transition: 'all 0.3s'
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </>
  );
}
