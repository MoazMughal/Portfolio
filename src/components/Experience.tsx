import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const experiences = [
  {
    title: 'Web Designer & Amazon Virtual Assistant',
    company: 'Amazon Gymkhana, Banni Gala Islamabad',
    date: 'March 2023 – Present',
    points: ['Team leadership in data management', 'Product variation creation and optimization', 'Graphic design for branding and marketing', 'E-commerce support and Amazon VA tasks'],
  },
  {
    title: 'Front-End Development Intern',
    company: 'Zicon Cloud',
    date: '2023 – 2024',
    points: ['Frontend development with modern frameworks', 'Docker-based cloud deployment', 'UI component development and testing', 'Agile development collaboration'],
  },
  {
    title: 'MERN Stack Developer',
    company: '',
    date: 'Started March 2022',
    points: ['Full-stack development with MERN stack', 'API development and integration', 'Database design with MongoDB', 'Responsive UI/UX implementation'],
  },
  {
    title: 'Library Management System',
    company: 'Academic Project',
    date: '2020',
    points: ['HTML, CSS, JavaScript frontend', 'PHP backend implementation', 'Database design and management', 'User authentication and authorization'],
  },
];

export default function Experience() {
  return (
    <Box id="experience" className="section-wrapper" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Work Experience
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {experiences.map((exp, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                <Box sx={{ background: 'linear-gradient(to right,#6a11cb,#2575fc)', p: 2.5 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>{exp.title}</Typography>
                  {exp.company && <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>{exp.company}</Typography>}
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>{exp.date}</Typography>
                </Box>
                <CardContent>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {exp.points.map((p, j) => (
                      <Typography component="li" variant="body2" key={j} sx={{ mb: 0.5 }}>{p}</Typography>
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
