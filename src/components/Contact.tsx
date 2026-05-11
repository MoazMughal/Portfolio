import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import { LocationOn as LocationOnIcon, Phone as PhoneIcon, Email as EmailIcon, Send as SendIcon } from '@mui/icons-material';

const contactDetails = [
  { icon: <LocationOnIcon />, label: 'Location', value: 'Islamabad, Pakistan' },
  { icon: <PhoneIcon />, label: 'Phone', value: '+92-313-7458522' },
  { icon: <EmailIcon />, label: 'Email', value: 'moazmughal786@gmail.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '923137458522'; // WhatsApp number (international format, no +)
    const text = `Hi, I'm ${form.name}!\n\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Box id="contact" className="contact-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title-white">
          Contact Me
        </Typography>
        <Grid container spacing={6} sx={{ mt: 3 }}>
          <Grid item xs={12} md={5}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, fontSize: '1.05rem', lineHeight: 1.8 }}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </Typography>
            {contactDetails.map(d => (
              <Box key={d.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ width: 50, height: 50, borderRadius: '50%', bgcolor: 'rgba(255,107,53,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35', flexShrink: 0 }}>
                  {d.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', fontSize: '0.85rem' }}>{d.label}</Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>{d.value}</Typography>
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ borderRadius: 3, p: 4, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                      sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(255,107,53,0.5)' }, '&.Mui-focused fieldset': { borderColor: '#ff6b35' } }, '& input::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                      sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(255,107,53,0.5)' }, '&.Mui-focused fieldset': { borderColor: '#ff6b35' } }, '& input::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
                  </Grid>
                </Grid>
                <TextField fullWidth placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(255,107,53,0.5)' }, '&.Mui-focused fieldset': { borderColor: '#ff6b35' } }, '& input::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
                <TextField fullWidth multiline rows={5} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(255,107,53,0.5)' }, '&.Mui-focused fieldset': { borderColor: '#ff6b35' } }, '& textarea::placeholder': { color: 'rgba(255,255,255,0.4)' } }} />
                <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />}
                  sx={{ bgcolor: '#ff6b35', color: '#fff', fontWeight: 600, borderRadius: 2, textTransform: 'none', fontSize: '1rem', py: 1.5,
                    '&:hover': { bgcolor: '#ff5722', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(255,107,53,0.4)' }, transition: 'all 0.3s' }}>
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
