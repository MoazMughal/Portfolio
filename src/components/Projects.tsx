import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Chip, Button } from '@mui/material';
import { GitHub as GitHubIcon, OpenInNew as OpenInNewIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

const fallbackProjects = [
  { title: 'FYP Portal', description: 'Web-based Student-Teacher-Coordinator Collaboration System for Final Year Project Selection.', image: '/2.PNG', tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'], github: 'https://github.com/MoazMughal/Web-Based-FYP-Portal.git', demo: '#', view: '#' },
  { title: 'ShopEase', description: 'A fully responsive e-commerce website with product filtering, cart functionality, and secure checkout.', image: '/1.PNG', tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'], github: '#', demo: '#', view: '#' },
  { title: 'Graphic Design Portfolio', description: 'A collection of graphic design work including logos, branding materials, and marketing collateral.', image: 'https://placehold.co/600x400', tags: ['Adobe Illustrator', 'Photoshop', 'Branding', 'UI/UX'], github: '#', demo: '#', view: '#' },
];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(data?.length ? data : fallbackProjects); setLoaded(true); })
      .catch(() => { setProjects(fallbackProjects); setLoaded(true); });
  }, []);

  const displayProjects = loaded ? projects : fallbackProjects;

  if (!loaded) return (
    <Box id="projects" className="section-wrapper" sx={{ background: '#0a0a0a', textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title-dark">My Projects</Typography>
        <Typography sx={{ mt: 4, color: 'rgba(255,255,255,0.5)' }}>Loading projects...</Typography>
      </Container>
    </Box>
  );

  return (
    <Box id="projects" className="section-wrapper" sx={{ background: '#0a0a0a' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title-dark">My Projects</Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {displayProjects.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{
                height: '100%', borderRadius: 3,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,107,53,0.2)',
                boxShadow: 'none', transition: 'all 0.35s',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                '&:hover': { transform: 'translateY(-10px)', border: '1px solid rgba(255,107,53,0.5)', background: 'rgba(255,107,53,0.05)' }
              }}>
                <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <CardMedia component="img" height={{ xs: 150, sm: 180, md: 200 }} image={p.image || 'https://placehold.co/600x400'} alt={p.title}
                    sx={{ objectFit: 'cover', transition: 'transform 0.4s', '&:hover': { transform: 'scale(1.05)' } }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)' }} />
                </Box>
                <CardContent sx={{ pt: 2.5, pb: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>{p.title}</Typography>
                  <Typography variant="body2" sx={{
                    color: 'rgba(255,255,255,0.6)', mb: 2, lineHeight: 1.5,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>{p.description || p.desc}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 'auto' }}>
                    {(p.tags || []).map((tag: string) => (
                      <Chip key={tag} label={tag} size="small"
                        sx={{ background: 'rgba(255,107,53,0.2)', color: '#ff6b35', fontWeight: 500, fontSize: '0.72rem', border: '1px solid rgba(255,107,53,0.3)' }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2.5, pb: 2.5, pt: 1, gap: 1, flexWrap: 'wrap' }}>
                  {p.github && p.github !== '#' && (
                    <Button size="small" variant="contained" href={p.github} target="_blank" startIcon={<GitHubIcon />}
                      sx={{ background: '#ff6b35', borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { background: '#ff5722' } }}>
                      Code
                    </Button>
                  )}
                  {p.demo && p.demo !== '#' && (
                    <Button size="small" variant="outlined" href={p.demo} target="_blank" startIcon={<OpenInNewIcon />}
                      sx={{ borderColor: 'rgba(255,107,53,0.5)', color: '#ff6b35', borderRadius: 2, textTransform: 'none', fontWeight: 600,
                        '&:hover': { background: 'rgba(255,107,53,0.1)', borderColor: '#ff6b35' } }}>
                      Demo
                    </Button>
                  )}
                  {p.view && p.view !== '#' && (
                    <Button size="small" variant="outlined" href={p.view} target="_blank" startIcon={<VisibilityIcon />}
                      sx={{ borderColor: 'rgba(255,107,53,0.5)', color: '#ff6b35', borderRadius: 2, textTransform: 'none', fontWeight: 600,
                        '&:hover': { background: 'rgba(255,107,53,0.1)', borderColor: '#ff6b35' } }}>
                      View
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
