import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';

const handleDownloadCV = async () => {
  try {
    const res = await fetch('/api/download-cv');
    if (!res.ok) { alert('CV not available yet.'); return; }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Moaz_Javed_CV.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch {
    alert('Failed to download CV.');
  }
};

export default function About() {
  return (
    <Box id="about" className="section-wrapper" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
          About Me
        </Typography>
        <Grid container spacing={6} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 2, lineHeight: 1.8 }}>
              Hello! I&apos;m Moaz Javed, a passionate web developer and graphic designer focused on creating beautiful and functional digital experiences.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              I graduated from Quaid-i-Azam University with a Bachelor&apos;s in Computer Science in 2023. My FYP was a portal built with the MERN stack.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Currently working at Amazon Gymkhana as a Web &amp; Graphic Designer and Ecommerce Specialist, combining technical skills with creative design.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              {[
                { icon: <PersonIcon fontSize="small" />, label: 'Name', value: 'Moaz Javed' },
                { icon: <EmailIcon fontSize="small" />, label: 'Email', value: 'moazmughal786@gmail.com' },
                { icon: <PhoneIcon fontSize="small" />, label: 'Phone', value: '+92-313-7458522' },
                { icon: <LocationOnIcon fontSize="small" />, label: 'Location', value: 'Islamabad, Pakistan' },
                { icon: <WorkIcon fontSize="small" />, label: 'Status', value: 'Available for Freelance' },
                { icon: <StarIcon fontSize="small" />, label: 'Experience', value: '3+ Years' },
              ].map(item => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: '#6a11cb' }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 80 }}>{item.label}:</Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadCV}
                sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', borderRadius: 3, fontWeight: 700, textTransform: 'none' }}
              >
                Download CV
              </Button>
              <Button
                variant="outlined"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ borderColor: '#6a11cb', color: '#6a11cb', borderRadius: 3, fontWeight: 700, textTransform: 'none' }}
              >
                Hire Me
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
