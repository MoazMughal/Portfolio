import { Box, Container, Typography, Divider } from '@mui/material';
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Instagram as InstagramIcon, Twitter as TwitterIcon } from '@mui/icons-material';

const socials = [
  { icon: <GitHubIcon />, href: 'https://github.com/MoazMughal', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/moazjaved', label: 'LinkedIn' },
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
];

const navLinks = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

export default function Footer() {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#ff6b35', mb: 3 }}>
          Moaz Javed
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 4 }}>
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-link" aria-label={s.label}>{s.icon}</a>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          {navLinks.map(link => (
            <Typography key={link} component="a" href={`#${link.toLowerCase()}`}
              sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem',
                '&:hover': { color: '#ff6b35' }, transition: 'color 0.2s' }}>
              {link}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          © {new Date().getFullYear()} Moaz Javed. All Rights Reserved. Built with Next.js & MUI.
        </Typography>
      </Container>
    </Box>
  );
}
