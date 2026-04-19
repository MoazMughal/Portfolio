import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const items = [
  { degree: 'Matric (Science)', school: 'FM. Memorial High School Rahwali', year: '2014 – 2015' },
  { degree: 'FSC Pre-Engineering', school: 'Superior College Gujranwala', year: '2016 – 2017' },
  { degree: 'Associate Degree in Computer Science', school: 'Superior College Lahore', year: '2017 – 2019' },
  { degree: "Bachelor's in Computer Science", school: 'Quaid-i-Azam University, Islamabad', year: '2020 – 2023', desc: 'Graduated from one of Pakistan\'s top-ranked universities. Completed FYP Portal using the MERN stack.' },
];

export default function Education() {
  return (
    <Box id="education" className="section-wrapper" sx={{ background: 'linear-gradient(to bottom,#f9f9f9,#fff)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Education
        </Typography>
        <Box className="timeline" sx={{ mt: 4 }}>
          {items.map((item, i) => (
            <Box key={i} className="timeline-item">
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.degree}</Typography>
              <Typography variant="subtitle1" sx={{ color: '#6a11cb', fontWeight: 600 }}>{item.school}</Typography>
              <Typography variant="body2" sx={{ color: '#888', mb: item.desc ? 1 : 0 }}>{item.year}</Typography>
              {item.desc && <Typography variant="body2">{item.desc}</Typography>}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
