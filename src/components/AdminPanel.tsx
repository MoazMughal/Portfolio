import { useState, useEffect, useRef } from 'react';
import {
  Drawer, Box, Typography, TextField, Button, IconButton, Alert,
  Tabs, Tab, Card, CardContent, Chip, Divider, CircularProgress, Avatar,
} from '@mui/material';
import {
  Lock as LockIcon, Close as CloseIcon, Delete as DeleteIcon,
  Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon,
  CloudUpload as UploadIcon, AddPhotoAlternate as ImageIcon,
  ArrowUpward as ArrowUpIcon, ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';

interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  view: string;
}

interface SkillGroup {
  _id?: string;
  category: string;
  skills: string[];
}

const emptyProject: Project = { title: '', description: '', image: '', tags: [], github: '', demo: '', view: '' };
const emptySkill: SkillGroup = { category: '', skills: [] };
const grad = { background: '#ff6b35', fontWeight: 700 };

export default function AdminPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [tab, setTab] = useState(0);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState<Project>(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [skillForm, setSkillForm] = useState<SkillGroup>(emptySkill);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(''), 4000);
  };

  const handleLogin = () => {
    const secret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === secret) { setAuthed(true); setAdminKey(password); }
    else notify('Wrong password', 'error');
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    setProjects(await res.json());
  };

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    setSkillGroups(await res.json());
  };

  useEffect(() => { if (authed) { fetchProjects(); fetchSkills(); } }, [authed]);
  useEffect(() => { if (!open) { setAuthed(false); setPassword(''); setAdminKey(''); setTab(0); } }, [open]);

  // Image from computer
  const handleImageFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setProjectForm(f => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  };

  // CV Upload
  const uploadCV = async () => {
    if (!cvFile) return notify('Select a PDF first', 'error');
    setCvUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const res = await fetch(`/api/upload-cv?adminKey=${adminKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileData: e.target?.result, fileName: cvFile.name }),
      });
      setCvUploading(false);
      if (res.ok) { notify('CV uploaded!'); setCvFile(null); }
      else { const d = await res.json(); notify(d.error, 'error'); }
    };
    reader.readAsDataURL(cvFile);
  };

  // Projects
  const addTag = () => { if (tagInput.trim()) { setProjectForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] })); setTagInput(''); } };
  const removeTag = (i: number) => setProjectForm(f => ({ ...f, tags: f.tags.filter((_, j) => j !== i) }));

  const startEditProject = (p: Project) => {
    setProjectForm({ ...p });
    setEditingProjectId(p._id!);
    setTagInput('');
    setImagePreview(p.image || '');
    setImageFile(null);
    setTab(1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const cancelEditProject = () => {
    setProjectForm(emptyProject); setEditingProjectId(null);
    setTagInput(''); setImagePreview(''); setImageFile(null);
  };

  const saveProject = async () => {
    if (!projectForm.title) return notify('Title is required', 'error');
    setLoading(true);
    const method = editingProjectId ? 'PUT' : 'POST';
    const body = editingProjectId
      ? { ...projectForm, _id: editingProjectId, adminKey }
      : { ...projectForm, adminKey };
    const res = await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setLoading(false);
    if (res.ok) {
      notify(editingProjectId ? 'Project updated!' : 'Project added!');
      cancelEditProject();
      await fetchProjects();
    } else notify('Failed to save project', 'error');
  };

  const moveProject = async (index: number, direction: 'up' | 'down') => {
    const newList = [...projects];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newList.length) return;
    [newList[index], newList[swapIdx]] = [newList[swapIdx], newList[index]];
    setProjects(newList);
    const items = newList.map((p, i) => ({ _id: p._id, order: i }));
    await fetch('/api/projects', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, adminKey }),
    });
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _id: id, adminKey }) });
    fetchProjects(); notify('Project deleted');
  };

  // Skills
  const addSkill = () => { if (skillInput.trim()) { setSkillForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] })); setSkillInput(''); } };
  const removeSkill = (i: number) => setSkillForm(f => ({ ...f, skills: f.skills.filter((_, j) => j !== i) }));
  const startEditSkill = (sg: SkillGroup) => { setSkillForm({ ...sg }); setEditingSkillId(sg._id!); setSkillInput(''); };
  const cancelEditSkill = () => { setSkillForm(emptySkill); setEditingSkillId(null); setSkillInput(''); };

  const saveSkill = async () => {
    if (!skillForm.category) return notify('Category is required', 'error');
    setLoading(true);
    const method = editingSkillId ? 'PUT' : 'POST';
    const body = editingSkillId ? { ...skillForm, _id: editingSkillId, adminKey } : { ...skillForm, adminKey };
    const res = await fetch('/api/skills', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setLoading(false);
    if (res.ok) { notify(editingSkillId ? 'Updated!' : 'Added!'); cancelEditSkill(); fetchSkills(); }
    else notify('Failed to save', 'error');
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Delete this skill group?')) return;
    await fetch('/api/skills', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _id: id, adminKey }) });
    fetchSkills(); notify('Deleted');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 520 }, bgcolor: '#1a1a1a' } }}>

      {/* Header */}
      <Box sx={{ p: 2.5, background: '#ff6b35', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>Admin Panel</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </Box>

      {msg && <Alert severity={msgType} sx={{ mx: 2, mt: 1.5, borderRadius: 2 }}>{msg}</Alert>}

      {/* Login */}
      {!authed ? (
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, mt: 6 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: '#ff6b35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Enter Admin Password</Typography>
          <TextField fullWidth type="password" label="Password" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: '#ff6b35' },
                '&.Mui-focused fieldset': { borderColor: '#ff6b35' }
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' }
            }} />
          <Button fullWidth variant="contained" onClick={handleLogin} sx={{ ...grad, py: 1.5, borderRadius: 2 }}>Login</Button>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth"
            sx={{ borderBottom: '1px solid #eee', '& .Mui-selected': { color: '#ff6b35' }, '& .MuiTabs-indicator': { bgcolor: '#ff6b35' } }}>
            <Tab label="CV" sx={{ fontWeight: 700 }} />
            <Tab label="Projects" sx={{ fontWeight: 700 }} />
            <Tab label="Skills" sx={{ fontWeight: 700 }} />
          </Tabs>

          {/* CV Tab */}
          {tab === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Upload / Replace CV (PDF)</Typography>
              <Button variant="outlined" component="label" startIcon={<UploadIcon />}
                sx={{ borderColor: '#ff6b35', color: '#ff6b35', mb: 1.5, borderRadius: 2 }}>
                Choose PDF
                <input type="file" accept=".pdf" hidden onChange={e => setCvFile(e.target.files?.[0] || null)} />
              </Button>
              {cvFile && <Typography variant="body2" sx={{ mb: 2, color: '#555' }}>{cvFile.name}</Typography>}
              <Button fullWidth variant="contained" onClick={uploadCV} disabled={!cvFile || cvUploading}
                startIcon={cvUploading ? <CircularProgress size={16} color="inherit" /> : <UploadIcon />}
                sx={{ ...grad, borderRadius: 2 }}>
                {cvUploading ? 'Uploading...' : 'Upload CV'}
              </Button>
            </Box>
          )}

          {/* Projects Tab */}
          {tab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                {editingProjectId ? '✏️ Edit Project' : '➕ Add New Project'}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField size="small" fullWidth label="Title *" value={projectForm.title}
                  onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      color: '#fff',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: '#ff6b35' },
                      '&.Mui-focused fieldset': { borderColor: '#ff6b35' }
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' }
                  }} />
                <TextField size="small" fullWidth multiline rows={3} label="Description" value={projectForm.description}
                  onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      color: '#fff',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: '#ff6b35' },
                      '&.Mui-focused fieldset': { borderColor: '#ff6b35' }
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' }
                  }} />

                {/* Image upload */}
                <Box sx={{ border: '2px dashed rgba(255,107,53,0.3)', borderRadius: 2, p: 2, textAlign: 'center', cursor: 'pointer',
                  '&:hover': { borderColor: '#ff6b35', bgcolor: 'rgba(255,107,53,0.03)' }, transition: 'all 0.2s' }}
                  onClick={() => imageInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) handleImageFile(f); }}>
                  <input ref={imageInputRef} type="file" accept="image/*" hidden
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />
                  {imagePreview ? (
                    <Box>
                      <Avatar src={imagePreview} variant="rounded" sx={{ width: '100%', height: 140, mx: 'auto', mb: 1, objectFit: 'cover' }} />
                      <Typography variant="caption" sx={{ color: '#ff6b35' }}>Click to change image</Typography>
                    </Box>
                  ) : (
                    <Box>
                      <ImageIcon sx={{ fontSize: 40, color: 'rgba(106,17,203,0.4)', mb: 1 }} />
                      <Typography variant="body2" sx={{ color: '#888' }}>Click or drag to upload image</Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>PNG, JPG, WEBP supported</Typography>
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" sx={{ color: '#999', mt: -1 }}>Or paste an image URL:</Typography>
                <TextField size="small" fullWidth label="Image URL (optional)" value={imageFile ? '' : projectForm.image}
                  onChange={e => { setProjectForm(f => ({ ...f, image: e.target.value })); setImagePreview(e.target.value); setImageFile(null); }}
                  placeholder="https://..." />

                <TextField size="small" fullWidth label="GitHub URL" value={projectForm.github}
                  onChange={e => setProjectForm(f => ({ ...f, github: e.target.value }))} />
                <TextField size="small" fullWidth label="Demo URL" value={projectForm.demo}
                  onChange={e => setProjectForm(f => ({ ...f, demo: e.target.value }))} />
                <TextField size="small" fullWidth label="View URL" value={projectForm.view}
                  onChange={e => setProjectForm(f => ({ ...f, view: e.target.value }))} />

                {/* Technologies */}
                <Typography variant="caption" sx={{ color: '#666', mt: 0.5 }}>Technologies Used</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <TextField size="small" label="e.g. React, Node.js" value={tagInput} sx={{ width: 180 }}
                    onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
                  <Button size="small" onClick={addTag} variant="outlined" sx={{ borderColor: '#ff6b35', color: '#ff6b35', borderRadius: 2 }}>Add</Button>
                  {projectForm.tags.map((t, i) => (
                    <Chip key={i} label={t} size="small" onDelete={() => removeTag(i)}
                      sx={{ background: '#ff6b35', color: 'white' }} />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button fullWidth variant="contained" onClick={saveProject} disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                    sx={{ ...grad, borderRadius: 2 }}>
                    {editingProjectId ? 'Update Project' : 'Add Project'}
                  </Button>
                  {editingProjectId && (
                    <Button variant="outlined" onClick={cancelEditProject} startIcon={<CancelIcon />}
                      sx={{ borderColor: '#ccc', color: '#666', borderRadius: 2 }}>Cancel</Button>
                  )}
                </Box>
              </Box>

              {projects.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#888' }}>
                    Existing Projects ({projects.length})
                  </Typography>
                  {projects.map((p, idx) => (
                    <Card key={p._id} sx={{ mb: 1.5, borderRadius: 2, border: editingProjectId === p._id ? '2px solid #ff6b35' : '1px solid #eee', transition: 'all 0.2s' }}>
                      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                          {p.image && (
                            <Avatar src={p.image} variant="rounded" sx={{ width: 52, height: 52, flexShrink: 0 }} />
                          )}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{p.title}</Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {p.tags.map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />)}
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3, flexShrink: 0 }}>
                            <IconButton size="small" onClick={() => moveProject(idx, 'up')} disabled={idx === 0}
                              sx={{ color: idx === 0 ? '#ccc' : '#ff6b35', p: 0.3 }}><ArrowUpIcon fontSize="small" /></IconButton>
                            <IconButton size="small" onClick={() => moveProject(idx, 'down')} disabled={idx === projects.length - 1}
                              sx={{ color: idx === projects.length - 1 ? '#ccc' : '#ff6b35', p: 0.3 }}><ArrowDownIcon fontSize="small" /></IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                            <IconButton size="small" onClick={() => startEditProject(p)} sx={{ color: '#ff6b35' }}><EditIcon fontSize="small" /></IconButton>
                            <IconButton size="small" onClick={() => p._id && deleteProject(p._id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </Box>
          )}

          {/* Skills Tab */}
          {tab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                {editingSkillId ? '✏️ Edit Skill Group' : '➕ Add Skill Group'}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField size="small" fullWidth label="Category *" value={skillForm.category}
                  onChange={e => setSkillForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Programming Languages" />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <TextField size="small" label="Add skill" value={skillInput} sx={{ width: 140 }}
                    onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} />
                  <Button size="small" onClick={addSkill} variant="outlined" sx={{ borderColor: '#ff6b35', color: '#ff6b35', borderRadius: 2 }}>Add</Button>
                  {skillForm.skills.map((s, i) => (
                    <Chip key={i} label={s} size="small" onDelete={() => removeSkill(i)}
                      sx={{ background: '#ff6b35', color: 'white' }} />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button fullWidth variant="contained" onClick={saveSkill} disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                    sx={{ ...grad, borderRadius: 2 }}>
                    {editingSkillId ? 'Update Group' : 'Add Group'}
                  </Button>
                  {editingSkillId && (
                    <Button variant="outlined" onClick={cancelEditSkill} startIcon={<CancelIcon />}
                      sx={{ borderColor: '#ccc', color: '#666', borderRadius: 2 }}>Cancel</Button>
                  )}
                </Box>
              </Box>

              {skillGroups.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#888' }}>
                    Existing Skill Groups ({skillGroups.length})
                  </Typography>
                  {skillGroups.map(sg => (
                    <Card key={sg._id} sx={{ mb: 1.5, borderRadius: 2, border: editingSkillId === sg._id ? '2px solid #ff6b35' : '1px solid #eee' }}>
                      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{sg.category}</Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {sg.skills.map(s => <Chip key={s} label={s} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />)}
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                            <IconButton size="small" onClick={() => startEditSkill(sg)} sx={{ color: '#ff6b35' }}><EditIcon fontSize="small" /></IconButton>
                            <IconButton size="small" onClick={() => sg._id && deleteSkill(sg._id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
}
