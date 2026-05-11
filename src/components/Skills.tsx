import { Box, Container, Typography, Grid } from '@mui/material';
import {
  Monitor, Add, Storage, ArrowUpward, CheckCircleOutline, ViewList
} from '@mui/icons-material';

// Real brand icon URLs
const techIcons = [
  { name: 'React',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue.js',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Laravel',     src: 'https://cdn.simpleicons.org/laravel/FF2D20' },
  { name: 'GitHub',      src: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'HTML5',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Bootstrap',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'JavaScript',  src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'PHP',         src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'CSS3',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Node.js',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'TypeScript',  src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Sass',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Figma',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'MySQL',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git',         src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

// Matching the reference: colored MUI icon + title
const expertiseData = [
  {
    title: 'Front-End Development',
    icon: <Monitor sx={{ color: '#4fc3f7', fontSize: { xs: 24, md: 26 } }} />,
    items: ['Vue.js, Vanilla JavaScript, React', 'Responsive & accessible UI development', 'State management: Vuex, Redux', 'REST & GraphQL API integration'],
  },
  {
    title: 'Styling & CSS Frameworks',
    icon: <Add sx={{ color: '#69f0ae', fontSize: { xs: 24, md: 26 } }} />,
    items: ['Vanilla CSS, Bootstrap 5, Tailwind CSS', 'Font Awesome & Vuetify for rich components', 'Ant Design, Material-UI for enterprise UIs', 'Custom theming & utility-first design'],
  },
  {
    title: 'Back-End Development',
    icon: <Storage sx={{ color: '#69f0ae', fontSize: { xs: 24, md: 26 } }} />,
    items: ['PHP & Laravel Framework expertise', 'Eloquent ORM, Blade templating, middleware', 'MySQL database design', 'Queues, events, scheduled tasks, REST APIs'],
  },
  {
    title: 'Version Control & Collaboration',
    icon: <ArrowUpward sx={{ color: '#ff6b35', fontSize: { xs: 24, md: 26 } }} />,
    items: ['Git & GitHub workflows (branching, PRs)', 'Continuous Integration: GitHub Actions', 'Code reviews & issue management', 'Documentation & technical writing'],
  },
  {
    title: 'Legacy Projects',
    icon: <CheckCircleOutline sx={{ color: '#69f0ae', fontSize: { xs: 24, md: 26 } }} />,
    items: ['CMS - improved load times by 50%', 'E-commerce integration: sales up by 30%', 'Internal ERP upgrade: streamlined workflows', 'Maintained legacy codebases & modernized architecture'],
  },
  {
    title: 'UI/UX Design',
    icon: <ViewList sx={{ color: '#ce93d8', fontSize: { xs: 24, md: 26 } }} />,
    items: ['User research & persona development', 'Wireframing & interactive prototyping', 'Tools: Figma, Sketch, Adobe XD', 'Usability testing & user feedback analysis'],
  },
];

export default function Skills() {
  return (
    <Box id="skills" className="expertise-section">
      <Container maxWidth="lg">
        <Typography variant="h2" className="section-title-dark">Expertise</Typography>

        {/* Brand icons row */}
        <Box className="tech-icons-container">
          {techIcons.map((tech, i) => (
            <Box key={i} className="tech-icon-item" style={{ animationDelay: `${i * 0.07}s` }} title={tech.name}>
              <img src={tech.src} alt={tech.name} className="tech-brand-img" />
            </Box>
          ))}
        </Box>

        {/* Expertise cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {expertiseData.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box className="expertise-card">
                <Box className="expertise-header">
                  {item.icon}
                  <Typography className="expertise-title">{item.title}</Typography>
                </Box>
                <Box>
                  {item.items.map((point, j) => (
                    <Typography key={j} className="expertise-item">• {point}</Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
