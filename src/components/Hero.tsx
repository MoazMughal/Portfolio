import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function Hero() {
  return (
    <Box id="home" className="hero-section">
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
        <Avatar
          src="/image.jpg"
          alt="Moaz Javed"
          className="hero-img"
          sx={{ width: 220, height: 220, mx: 'auto', border: '5px solid rgba(255,255,255,0.3)' }}
        />
        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: 'white', mt: 3 }}>
          Moaz Javed
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
          Web Designer &amp; Ecommerce Specialist
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{ bgcolor: 'white', color: '#6a11cb', fontWeight: 700, borderRadius: 3, '&:hover': { bgcolor: '#f0f0f0' } }}
          >
            View My Work
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{ borderColor: 'white', color: 'white', fontWeight: 700, borderRadius: 3, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Contact Me
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
