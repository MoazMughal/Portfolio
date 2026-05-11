import { Box, Container, Typography, Grid, Chip } from '@mui/material';

const whyCards = [
  {
    icon: '📊',
    title: 'Business-Driven Development',
    desc: 'I partner with stakeholders to understand KPIs, user personas, and market pressures, ensuring every feature delivers measurable value—whether it\'s conversion lift, time saved, or cost reduction.',
  },
  {
    icon: '🚩',
    title: 'End-to-End Expertise',
    desc: 'From architecting scalable APIs with Node/Express to crafting pixel-perfect UIs in React/Tailwind, I own the full stack and streamline communication across tech, design, and business teams.',
  },
  {
    icon: '🔄',
    title: 'Agile & Transparent Collaboration',
    desc: 'I thrive in Scrum and Kanban environments, leveraging Jira and GitHub Projects to keep tasks visible, eliminate blockers, and ensure continuous delivery through regular demos and retros.',
  },
];

const roles = ['Full Stack Developer', 'MERN Stack Developer', 'UI/UX Enthusiast'];

export default function About() {
  return (
    <Box id="about" className="about-section">
      <Container maxWidth="lg">

        {/* ── Top: AboutMe image left, text right ── */}
        <Grid container spacing={{ xs: 2, md: 8 }} alignItems="flex-start" className="about-top-grid" sx={{ mb: 8 }}>

          {/* LEFT — AboutMe illustration */}
          <Grid item xs={12} sm={4} md={3} className="about-img-grid">
            <Box className="about-img-wrap">
              <img src="/AboutMe.png" alt="Moaz Javed" className="about-img-circle" />
            </Box>
          </Grid>

          {/* RIGHT — text content */}
          <Grid item xs={12} sm={8} md={9} className="about-text-grid">

            <Typography variant="h3" className="about-heading">About Me</Typography>

            {/* Role chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {roles.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  size="small"
                  sx={{
                    background: 'rgba(255,107,53,0.15)',
                    color: '#ff6b35',
                    border: '1px solid rgba(255,107,53,0.35)',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                  }}
                />
              ))}
            </Box>

            <Typography className="about-intro">
              I&apos;m <span className="highlight-name">Moaz Javed</span>, a passionate Full-Stack
              Web Developer with over 3 years of hands-on experience crafting web applications that
              solve real business problems. I specialize in building scalable, high-performance
              solutions using modern technologies like React, Next.js, Node.js, MongoDB, Vue,
              Tailwind CSS and Laravel PHP. My journey has taken me from small startups to large
              enterprises, where I&apos;ve honed my skills in both frontend and backend development.
            </Typography>

            <Typography className="about-description">
              When I&apos;m not writing code, I dive into technical blogs, contribute to open-source
              projects, and mentor aspiring developers. What drives me most is the &quot;aha&quot;
              moment when complex requirements come together in a clean, intuitive interface — seeing
              a product go live and move the needle makes every late-night debugging session
              worthwhile.
            </Typography>

          </Grid>
        </Grid>

        {/* ── Why Work With Me ── */}
        <Typography variant="h4" className="why-heading">Why Work With Me?</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {whyCards.map((card, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box className="why-card">
                <Box className="why-card-icon-row">
                  <span className="why-card-emoji">{card.icon}</span>
                  <Typography className="why-card-title">{card.title}</Typography>
                </Box>
                <Typography className="why-card-desc">{card.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
