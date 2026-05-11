import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AdminPanel from './AdminPanel';

const navLinks = ['Home','About','Projects','Skills','Contact'];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  const scrollTo = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}
        sx={{ background: trigger ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', borderBottom: trigger ? '1px solid rgba(255,107,53,0.2)' : '1px solid transparent' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
          <Typography variant="h5"
            sx={{ fontWeight: 800, color: '#ff6b35', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { color: '#ff5722' } }}
            onClick={() => scrollTo('home')}>
            Moaz Javed
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navLinks.map(link => (
              <Button key={link} onClick={() => scrollTo(link)}
                sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'none', '&:hover': { color: '#ff6b35', background: 'rgba(255,107,53,0.1)' } }}>
                {link}
              </Button>
            ))}
            <Button variant="outlined" startIcon={<AdminIcon />} onClick={() => setAdminOpen(true)}
              sx={{ ml: 1, borderColor: 'rgba(255,107,53,0.5)', color: '#ff6b35', fontWeight: 700, textTransform: 'none', borderRadius: 2,
                '&:hover': { background: '#ff6b35', color: '#fff', borderColor: '#ff6b35' } }}>
              Admin
            </Button>
          </Box>

          <Box sx={{ display: { md: 'none' }, display: 'flex', gap: 1 }}>
            <IconButton sx={{ color: '#ff6b35' }} onClick={() => setAdminOpen(true)}><AdminIcon /></IconButton>
            <IconButton sx={{ color: '#ff6b35' }} onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: '#0a0a0a', color: '#fff' } }}>
        <List sx={{ width: 220, pt: 4 }}>
          {navLinks.map(link => (
            <ListItem key={link} disablePadding>
              <ListItemButton onClick={() => scrollTo(link)} sx={{ '&:hover': { background: 'rgba(255,107,53,0.1)' } }}>
                <ListItemText primary={link} primaryTypographyProps={{ fontWeight: 600, color: '#fff' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
