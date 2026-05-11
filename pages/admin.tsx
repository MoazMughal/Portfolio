import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, TextField, Button, Card, CardContent, CardActions, Grid, Chip, Divider, Alert, IconButton } from '@mui/material';
import { Delete as DeleteIcon, CloudUpload as UploadFileIcon, Add as AddIcon, Lock as LockIcon } from '@mui/icons-material';

interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

interface SkillGroup {
  _id?: string;
  category: string;
  skills: string[];
}

const emptyProject: Project = { title: '', description: '', image: '', tags: [], github: '', demo: '' };
const emptySkill: SkillGroup = { category: '', skills: [] };

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');

  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>(emptyProject);
  const [tagInput, setTagInput] = useState('');

  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [newSkill, setNewSkill] = useState<SkillGroup>(emptySkill);
  const [skillInput, setSkillInput] = useState('');

  const [cvFile, setCvFile] = useState<File | null>(null);

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleLogin = () => {
    const secret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === secret) {
      setAuthed(true);
      setAdminKey(password);
    } else {
      notify('Wrong password', 'error');
    }
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    setProjects(await res.json());
  };

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    setSkillGroups(await res.json());
  };

  useEffect(() => {
    if (authed) { fetchProjects(); fetchSkills(); }
  }, [authed]);

  const uploadCV = async () => {
    if (!cvFile) return notify('Select a PDF file first', 'error');
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target?.result as string;
      const res = await fetch(`/api/upload-cv?adminKey=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileData, fileName: cvFile.name }),
      });
      const data = await res.json();
      if (res.ok) notify('CV uploaded successfully!');
      else notify(data.error, 'error');
    };
    reader.readAsDataURL(cvFile);
  };

  const addProject = async () => {
    if (!newProject.title) return notify('Title is required', 'error');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProject, adminKey }),
    });
    if (res.ok) { notify('Project added!'); setNewProject(emptyProject); setTagInput(''); fetchProjects(); }
    else notify('Failed to add project', 'error');
  };

  const deleteProject = async (id: string) => {
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, adminKey }),
    });
    fetchProjects();
    notify('Project deleted');
  };

  const addSkillGroup = async () => {
    if (!newSkill.category) return notify('Category is required', 'error');
    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSkill, adminKey }),
    });
    if (res.ok) { notify('Skill group added!'); setNewSkill(emptySkill); setSkillInput(''); fetchSkills(); }
    else notify('Failed to add skill group', 'error');
  };

  const deleteSkillGroup = async (id: string) => {
    await fetch('/api/skills', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, adminKey }),
    });
    fetchSkills();
    notify('Skill group deleted');
  };

  if (!authed) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        <Head><title>Admin | Moaz Javed Portfolio</title></Head>
        <Card sx={{ p: 4, borderRadius: 3, minWidth: 340, textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 48, color: '#6a11cb', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Admin Login</Typography>
          {msg && <Alert severity={msgType} sx={{ mb: 2 }}>{msg}</Alert>}
          <TextField
            fullWidth type="password" label="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={handleLogin}
            sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', py: 1.5, fontWeight: 700 }}>
            Login
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <Head><title>Admin Panel | Moaz Javed</title></Head>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(135deg,#6a11cb,#2575fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 4 }}>Manage your portfolio content</Typography>

          {msg && <Alert severity={msgType} sx={{ mb: 3 }}>{msg}</Alert>}

          {/* CV Upload */}
          <Card sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Upload CV (PDF)</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}
                  sx={{ borderColor: '#6a11cb', color: '#6a11cb' }}>
                  Choose PDF
                  <input type="file" accept=".pdf" hidden onChange={e => setCvFile(e.target.files?.[0] || null)} />
                </Button>
                {cvFile && <Typography variant="body2" sx={{ color: '#555' }}>{cvFile.name}</Typography>}
                <Button variant="contained" onClick={uploadCV} disabled={!cvFile}
                  sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', fontWeight: 700 }}>
                  Upload CV
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Add Project */}
          <Card sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Add New Project</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Title *" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Image URL" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} placeholder="https://..." />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} label="Description *" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="GitHub URL" value={newProject.github} onChange={e => setNewProject({ ...newProject, github: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Demo URL" value={newProject.demo} onChange={e => setNewProject({ ...newProject, demo: e.target.value })} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField size="small" label="Add tag" value={tagInput} onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && tagInput) { setNewProject({ ...newProject, tags: [...newProject.tags, tagInput] }); setTagInput(''); } }} />
                    <Button size="small" onClick={() => { if (tagInput) { setNewProject({ ...newProject, tags: [...newProject.tags, tagInput] }); setTagInput(''); } }}>Add Tag</Button>
                    {newProject.tags.map((t, i) => (
                      <Chip key={i} label={t} onDelete={() => setNewProject({ ...newProject, tags: newProject.tags.filter((_, j) => j !== i) })}
                        sx={{ background: 'linear-gradient(to right,#6a11cb,#2575fc)', color: 'white' }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} onClick={addProject}
                sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', fontWeight: 700 }}>
                Add Project
              </Button>
            </CardActions>
          </Card>

          {/* Existing Projects */}
          {projects.length > 0 && (
            <Card sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Existing Projects ({projects.length})</Typography>
                {projects.map((p, i) => (
                  <Box key={p._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: i < projects.length - 1 ? '1px solid #eee' : 'none' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{p.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                        {p.tags.map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.7rem' }} />)}
                      </Box>
                    </Box>
                    <IconButton color="error" onClick={() => p._id && deleteProject(p._id)}><DeleteIcon /></IconButton>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Add Skill Group */}
          <Card sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Add Skill Group</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Category *" value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })} placeholder="e.g. Programming Languages" />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <TextField size="small" label="Add skill" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && skillInput) { setNewSkill({ ...newSkill, skills: [...newSkill.skills, skillInput] }); setSkillInput(''); } }} />
                    <Button size="small" onClick={() => { if (skillInput) { setNewSkill({ ...newSkill, skills: [...newSkill.skills, skillInput] }); setSkillInput(''); } }}>Add</Button>
                    {newSkill.skills.map((s, i) => (
                      <Chip key={i} label={s} onDelete={() => setNewSkill({ ...newSkill, skills: newSkill.skills.filter((_, j) => j !== i) })}
                        sx={{ background: 'linear-gradient(to right,#6a11cb,#2575fc)', color: 'white' }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} onClick={addSkillGroup}
                sx={{ background: 'linear-gradient(135deg,#6a11cb,#2575fc)', fontWeight: 700 }}>
                Add Skill Group
              </Button>
            </CardActions>
          </Card>

          {/* Existing Skills */}
          {skillGroups.length > 0 && (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Existing Skill Groups</Typography>
                {skillGroups.map((sg, i) => (
                  <Box key={sg._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: i < skillGroups.length - 1 ? '1px solid #eee' : 'none' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{sg.category}</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                        {sg.skills.map(s => <Chip key={s} label={s} size="small" sx={{ fontSize: '0.7rem' }} />)}
                      </Box>
                    </Box>
                    <IconButton color="error" onClick={() => sg._id && deleteSkillGroup(sg._id)}><DeleteIcon /></IconButton>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
}
