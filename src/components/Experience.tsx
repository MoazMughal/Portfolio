import { Box, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { WorkOutline } from '@mui/icons-material';

const experiences = [
  { title: 'Web Designer & Amazon Virtual Assistant', company: 'Amazon Gymkhana, Banni Gala Islamabad', date: 'March 2023 – Present', type: 'Full-time', points: ['Team leadership in data management', 'Product variation creation and optimization', 'Graphic design for branding and marketing', 'E-commerce support and Amazon VA tasks'] },
  { title: 'Front-End Development Intern', company: 'Zicon Cloud', date: '2023 – 2024', type: 'Internship', points: ['Frontend development with modern frameworks', 'Docker-based cloud deployment', 'UI component development and testing', 'Agile development collaboration'] },
  { title: 'MERN Stack Developer', company: 'Freelance', date: 'March 2022 – Present', type: 'Freelance', points: ['Full-stack development with MERN stack', 'API development and integration', 'Database design with MongoDB', 'Responsive UI/UX implementation'] },
  { title: 'Library Management System', company: 'Academic Project – QAU', date: '2020', type: 'Academic', points: ['HTML, CSS, JavaScript frontend', 'PHP backend implementation', 'Database design and management', 'User authentication and authorization'] },
];

const typeColors: Record<string, string> = { 'Full-time': '#22c55e', 'Internship': '#f59e0b', 'Freelance': '#3b82f6', 'Academic': '#8b5cf6' };

export default function Experience() {
  return (
    <Box id="experience" className="section-wrapper" sx={{ bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>Work Experience</Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {experiences.map((exp, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 50px rgba(106,17,203,0.15)' } }}>
                <Box sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', p: 2.5, borderRadius: '16px 16px 0 0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <WorkOutline sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                    <Chip label={exp.type} size="small" sx={{ bgcolor: typeColors[exp.type] || '#888', color: 'white', fontWeight: 700, fontSize: '0.7rem', height: 22 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.3 }}>{exp.title}</Typography>
                  {exp.company && <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mt: 0.5 }}>{exp.company}</Typography>}
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>{exp.date}</Typography>
                </Box>
                <CardContent sx={{ pt: 2 }}>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {exp.points.map((p, j) => (
                      <Typography component="li" variant="body2" key={j} sx={{ mb: 0.8, color: '#555', lineHeight: 1.6 }}>{p}</Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
