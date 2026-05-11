import { Box, Container, Typography, Chip } from '@mui/material';
import { School } from '@mui/icons-material';

const items = [
  { degree: 'Matric (Science)', school: 'FM. Memorial High School Rahwali', year: '2014 – 2015', icon: '🏫' },
  { degree: 'FSC Pre-Engineering', school: 'Superior College Gujranwala', year: '2016 – 2017', icon: '📚' },
  { degree: 'Associate Degree in Computer Science', school: 'Superior College Lahore', year: '2017 – 2019', icon: '💻' },
  { degree: "Bachelor's in Computer Science", school: 'Quaid-i-Azam University, Islamabad', year: '2020 – 2023', desc: "Graduated from one of Pakistan's top-ranked universities. Completed FYP Portal using the MERN stack.", icon: '🎓' },
];

export default function Education() {
  return (
    <Box id="education" className="section-wrapper" sx={{ background: 'linear-gradient(180deg,#fff 0%,#f9f4ff 100%)' }}>
      <Container maxWidth="md">
        <Typography variant="h2" className="section-title center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Education
        </Typography>
        <Box className="timeline" sx={{ mt: 4 }}>
          {items.map((item, i) => (
            <Box key={i} className="timeline-item">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{item.icon} {item.degree}</Typography>
                  <Typography variant="subtitle1" sx={{ color: '#6a11cb', fontWeight: 600, mb: 0.5 }}>{item.school}</Typography>
                  {item.desc && <Typography variant="body2" sx={{ color: '#555', mt: 1, lineHeight: 1.7 }}>{item.desc}</Typography>}
                </Box>
                <Chip label={item.year} size="small"
                  sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', color: 'white', fontWeight: 600, flexShrink: 0 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
